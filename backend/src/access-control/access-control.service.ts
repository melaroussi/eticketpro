import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AccessControlService {
  private readonly logger = new Logger(AccessControlService.name);

  constructor(private readonly db: DatabaseService) {}

  async validateAndRegisterScan(
    ticketSellId: string | null,
    ticketId: string | null,
    readerIP: string | null
  ): Promise<any> {
    try {
      this.logger.log(`Validating scan request: ticketSellId=${ticketSellId}, ticketId=${ticketId}, readerIP=${readerIP}`);

      // --- PASS/Subscription Verification Branch ---
      if (ticketId && String(ticketId).startsWith('PASS-')) {
        const passResults = await this.db.executeQuery(
          'SELECT * FROM pass_subscriptions WHERE qrCode=? AND status="Actif"',
          [ticketId]
        );

        if (!passResults || passResults.length === 0) {
          return {
            status: 'FAILURE',
            reason: 'PASS invalide ou expiré',
          };
        }

        const pass = passResults[0];
        const today = new Date().toISOString().split('T')[0];
        // handle both nextjs and database names for pass dates
        const startDateVal = pass.validityStartDatetime || pass.startDate || pass.startDatetime;
        const endDateVal = pass.validityStopDatetime || pass.endDate || pass.stopDatetime;
        
        const start = startDateVal ? new Date(startDateVal).toISOString().split('T')[0] : today;
        const end = endDateVal ? new Date(endDateVal).toISOString().split('T')[0] : today;

        if (today < start || today > end) {
          return {
            status: 'FAILURE',
            reason: 'PASS hors période de validité',
          };
        }

        const zoneIdResults = await this.db.executeQuery(
          'SELECT zoneId from readers WHERE ip=?',
          [readerIP]
        );

        if (!zoneIdResults || zoneIdResults.length === 0) {
          return {
            status: 'FAILURE',
            reason: 'Lecteur ou zone non identifié',
          };
        }

        const zoneId = zoneIdResults[0].zoneId;

        await this.db.executeQuery(
          'INSERT INTO scans(zoneId, passSubscriptionId) VALUES (?, ?)',
          [zoneId, pass.id]
        );

        return {
          status: 'SUCCESS',
          message: `PASS Admis (${pass.holderFirstName || ''} ${pass.holderLastName || ''})`,
        };
      }
      // --- End of PASS Verification Branch ---

      // Standard Ticket Verification
      const zoneIdResults = await this.db.executeQuery(
        'SELECT zoneId from readers WHERE ip=?',
        [readerIP]
      );

      if (!zoneIdResults || zoneIdResults.length === 0) {
        return {
          status: 'FAILURE',
          reason: 'Non identified zone with given reader IP',
        };
      }

      const zoneId = zoneIdResults[0].zoneId;

      const readerAutorizationResults = await this.db.executeQuery(
        'SELECT a.authorised AS "authorised" FROM access a INNER JOIN readers r ON a.readerId = r.id WHERE a.ticketId = ? AND r.ip=?',
        [ticketId, readerIP]
      );

      if (!readerAutorizationResults || readerAutorizationResults.length === 0 || !readerAutorizationResults[0].authorised) {
        return {
          status: 'FAILURE',
          reason: 'Reader is not allowed',
        };
      }

      const scansNumberResult = await this.db.executeQuery(
        'SELECT COUNT(*) AS "scanNumber" FROM scans WHERE ticketSellId= ? AND zoneId= ?',
        [ticketSellId, zoneId]
      );

      const authorizedScansResult = await this.db.executeQuery(
        'SELECT scanNumber AS "authorizedScans" FROM zone_scans WHERE ticketId = ? AND zoneId= ?',
        [ticketId, zoneId]
      );

      if (scansNumberResult && authorizedScansResult && authorizedScansResult.length > 0) {
        const scanNumber = scansNumberResult[0].scanNumber;
        const authorizedScans = authorizedScansResult[0].authorizedScans;

        if (authorizedScans > scanNumber) {
          await this.db.executeQuery(
            'INSERT INTO scans(zoneId, ticketSellId) VALUES (?, ?)',
            [zoneId, ticketSellId]
          );

          const availableScansInfos = await this.db.executeQuery(
            "SELECT z.label AS 'zone', MAX(zs.scanNumber) AS 'scanNumber', (SELECT COUNT(*) FROM scans s INNER JOIN ticket_sells ts ON ts.id = s.ticketSellId AND s.ticketSellId = ? AND zoneId = z.id) AS 'scanned' FROM zones z INNER JOIN zone_scans zs ON zs.zoneId = z.id GROUP BY z.id, z.label",
            [ticketSellId]
          );

          return {
            status: 'SUCCESS',
            availableScansInfos,
          };
        } else {
          const availableScansInfos = await this.db.executeQuery(
            "SELECT z.label AS 'zone', COUNT(s.id) AS 'scaned', MAX(zs.scanNumber) AS 'scanNumber' FROM scans s INNER JOIN zones z ON s.zoneId = z.id INNER JOIN zone_scans zs ON zs.zoneId = s.zoneId AND zs.ticketId = s.ticketSellId WHERE ticketSellId = ? GROUP BY z.id, z.label",
            [ticketSellId]
          );

          return {
            status: 'FAILURE',
            reason: 'No available scans on this zone',
            availableScansInfos,
          };
        }
      }

      return {
        status: 'FAILURE',
        reason: 'Missing scans validation config',
      };
    } catch (error) {
      this.logger.error('Error during validation scan', error);
      return {
        status: 'FAILURE',
        reason: error.message || error,
      };
    }
  }
}
