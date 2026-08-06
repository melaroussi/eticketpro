import { Controller, Get, Post, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseService } from '../database/database.service';
import { EmailService } from '../email/email.service';
import { AccessControlService } from '../access-control/access-control.service';

@Controller()
export class ApiController {
  constructor(
    private readonly db: DatabaseService,
    private readonly email: EmailService,
    private readonly accessControl: AccessControlService,
  ) {}

  // ----------------------------------------------------
  // USERS ENDPOINTS
  // ----------------------------------------------------
  @Get('users')
  async getUsers(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      let result: any = {};

      if (operation === 'get-all') {
        result = await this.db.executeQuery(
          `SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.gender, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile, users.allowedModules as allowedModules FROM users LEFT JOIN departments ON departments.id = users.departmentId`
        );
      } else if (operation === 'get-one') {
        const id = req.query.id as string;
        result = await this.db.executeQuery(
          `SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.password, users.gender, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile, users.allowedModules as allowedModules FROM users LEFT JOIN departments ON departments.id = users.departmentId WHERE users.id=?`,
          [id]
        );
      } else if (operation === 'login') {
        const email = req.query.email as string;
        const password = req.query.password as string;
        result = await this.db.executeQuery(
          `SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.gender, users.password, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile, users.allowedModules as allowedModules FROM users LEFT JOIN departments ON departments.id = users.departmentId WHERE users.email=? AND users.password=?`,
          [email, password]
        );
      } else if (operation === 'recover') {
        const email = req.query.email as string;
        result = await this.db.executeQuery(
          `SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.gender, users.password, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile, users.allowedModules as allowedModules FROM users LEFT JOIN departments ON departments.id = users.departmentId WHERE email=?`,
          [email]
        );
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('users')
  async postUsers(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'create') {
        result = await this.db.executeQuery(
          `INSERT INTO users(firstName, lastName, gender, email, phone, password, departmentId, profile, businessName, type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [data.firstName, data.lastName, data.gender, data.email, data.phone, data.password, data.departmentId, data.profile, data.businessName, data.type, data.status]
        );

        if (result && result.insertId) {
          this.email.sendEmail(
            data.email,
            'Bienvenue sur e-Ticket Pro !',
            `<h3>Bonjour ${data.firstName} ${data.lastName},</h3>
             <p>Votre compte e-Ticket Pro a été créé avec succès.</p>
             <p><strong>Identifiant (Email) :</strong> ${data.email}</p>
             <p><strong>Profil :</strong> ${data.profile}</p>
             <br/>
             <p>L'équipe e-Ticket Pro</p>`
          ).catch(err => console.error('Email send failed:', err));
        }
      } else if (operation === 'update') {
        const id = req.query.id as string;
        result = await this.db.executeQuery(
          `UPDATE users SET firstName=?, lastName=?, gender=?, email=?, phone=?, password=?, departmentId=?, profile=?, businessName=?, type=?, status=? WHERE id = ?`,
          [data.firstName, data.lastName, data.gender, data.email, data.phone, data.password, data.departmentId, data.profile, data.businessName, data.type, data.status, id]
        );
      } else if (operation === 'update-permissions') {
        const id = req.query.id as string;
        result = await this.db.executeQuery(
          `UPDATE users SET allowedModules=? WHERE id = ?`,
          [data.allowedModules, id]
        );
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('users')
  async deleteUsers(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = await this.db.executeQuery(`DELETE FROM users WHERE id=?`, [id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  // ----------------------------------------------------
  // TICKETS ENDPOINTS
  // ----------------------------------------------------
  @Get('tickets')
  async getTickets(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      let result: any = {};
      if (id) {
        result = await this.db.executeQuery('SELECT * FROM tickets WHERE id=?', [id]);
      } else {
        result = await this.db.executeQuery('SELECT * FROM tickets');
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('tickets')
  async postTickets(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'create') {
        result = await this.db.executeQuery(
          `INSERT INTO tickets(category, type, price, needReservation, minimumOrders, forParking, forGraphicalSell, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [data.category, data.type, data.price, data.needReservation, data.minimumOrders, data.forParking, data.forGraphicalSell, data.description]
        );
      } else if (operation === 'update') {
        const id = req.query.id as string;
        result = await this.db.executeQuery(
          `UPDATE tickets SET category=?, type=?, price=?, needReservation=?, minimumOrders=?, onTimeDefinitionAllowedScanNumber=?, forParking=?, forGraphicalSell = ?, NFCIdentifyer=?, description=? WHERE id = ?`,
          [data.category, data.type, data.price, data.needReservation, data.minimumOrders, data.onTimeDefinitionAllowedScanNumber, data.forParking, data.forGraphicalSell, data.NFCIdentifyer, data.description, id]
        );
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('tickets')
  async deleteTickets(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = await this.db.executeQuery(`DELETE FROM tickets WHERE id=?`, [id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  // ----------------------------------------------------
  // TICKETS SELLS & SCANS
  // ----------------------------------------------------
  @Get('tickets/sells')
  async getTicketSells(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      let result: any = {};
      if (id) {
        result = await this.db.executeQuery(
          `SELECT sells.id AS id, sells.datetime AS datetime, sells.validityStartDatetime AS validityStartDatetime, sells.validityStopDatetime AS validityStopDatetime, sells.allowedScanNumber AS allowedScanNumber, positions.positionCode AS 'positionCode', positions.price AS 'positionPrice', sells.printed AS printed, sells.canceled AS canceled, sells.userId AS userId, sells.clientId AS clientId, tickets.id AS 'ticketId', tickets.category AS category, tickets.type AS type, tickets.price AS price, tickets.needReservation AS needReservation, tickets.forParking AS forParking, tickets.forGraphicalSell AS forGraphicalSell, tickets.NFCIdentifyer AS NFCIdentifyer, users.firstName AS firstName, users.lastName AS lastName, (SELECT COUNT(*) FROM scans WHERE scans.ticketSellId = sells.id) AS scanNumber FROM ticket_sells AS sells INNER JOIN tickets as tickets ON tickets.id = sells.ticketId LEFT JOIN users ON users.id = sells.userId LEFT JOIN positions ON positions.id = sells.positionId WHERE sells.id=?`,
          [id]
        );
      } else {
        result = await this.db.executeQuery(
          `SELECT sells.id AS id, sells.datetime AS datetime, sells.validityStartDatetime AS validityStartDatetime, sells.validityStopDatetime AS validityStopDatetime, sells.allowedScanNumber AS allowedScanNumber, sells.printed AS printed, sells.canceled AS canceled, sells.userId AS userId, sells.clientId AS clientId, tickets.id AS 'ticketId', tickets.category AS category, tickets.type AS type, tickets.price AS price, tickets.needReservation AS needReservation, tickets.forParking AS forParking, tickets.forGraphicalSell AS forGraphicalSell, tickets.NFCIdentifyer AS NFCIdentifyer, (SELECT COUNT(*) FROM scans WHERE scans.ticketSellId = sells.id) AS scanNumber FROM ticket_sells AS sells INNER JOIN tickets as tickets ON tickets.id = sells.ticketId ORDER BY sells.datetime DESC`
        );
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('tickets/sells')
  async postTicketSells(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      let result: any = {};

      if (operation === 'sell') {
        const data = req.body;
        if (data && Array.isArray(data)) {
          for (const item of data) {
            for (let i = 1; i <= item.quantity; i++) {
              result = await this.db.executeQuery(
                'INSERT INTO ticket_sells(validityStartDatetime, validityStopDatetime, allowedScanNumber, ticketId, paiementType, userId, clientId) VALUES(?, ?, ?, ?, ?, ?, ?)',
                [item.validityStartDatetime, item.validityStopDatetime, item.allowedScanNumber, item.ticketId, item.paiementType, item.userId, item.clientId]
              );
            }
          }
        }
      } else if (operation === 'graphical-sell') {
        const data = req.body;
        if (data) {
          result = await this.db.executeQuery(
            'INSERT INTO ticket_sells(validityStartDatetime, validityStopDatetime, allowedScanNumber, ticketId, positionId, paiementType, userId, clientId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
            [data.validityStartDatetime, data.validityStopDatetime, data.allowedScanNumber, data.ticketId, data.positionId, data.paiementType, data.userId, data.clientId]
          );
          await this.db.executeQuery('UPDATE positions SET isSold = TRUE WHERE id=?', [data.positionId]);
        }
      } else if (operation === 'cancel') {
        const id = req.query.id as string;
        result = await this.db.executeQuery('UPDATE ticket_sells SET canceled = TRUE WHERE id = ?', [id]);
      } else if (operation === 'print') {
        const id = req.query.id as string;
        result = await this.db.executeQuery('UPDATE ticket_sells SET printed = TRUE WHERE id = ?', [id]);
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('tickets/analytics')
  async getTicketsAnalytics(@Req() req: Request, @Res() res: Response) {
    try {
      const query = req.query.query as string;
      let result: any = {};

      if (query === 'year-sells') {
        result = await this.db.executeQuery(
          "SELECT COUNT(*) AS sellsNumber FROM ticket_sells WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW())"
        );
      } else if (query === 'month-sells') {
        result = await this.db.executeQuery(
          "SELECT COUNT(*) AS sellsNumber FROM ticket_sells WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM ticket_sells.datetime)=EXTRACT(MONTH FROM NOW())"
        );
      } else if (query === 'day-sells') {
        result = await this.db.executeQuery(
          "SELECT COUNT(*) AS sellsNumber FROM ticket_sells WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM ticket_sells.datetime)=EXTRACT(MONTH FROM NOW()) AND EXTRACT(DAY FROM ticket_sells.datetime)=EXTRACT(DAY FROM NOW())"
        );
      } else if (query === 'year-turnover') {
        result = await this.db.executeQuery(
          "SELECT IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW())"
        );
      } else if (query === 'month-turnover') {
        result = await this.db.executeQuery(
          "SELECT IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM ticket_sells.datetime)=EXTRACT(MONTH FROM NOW())"
        );
      } else if (query === 'day-turnover') {
        result = await this.db.executeQuery(
          "SELECT IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM ticket_sells.datetime)=EXTRACT(MONTH FROM NOW()) AND EXTRACT(DAY FROM ticket_sells.datetime)=EXTRACT(DAY FROM NOW())"
        );
      } else if (query === 'sells-by-type') {
        result = await this.db.executeQuery(
          "SELECT tickets.type AS type, COUNT(*) AS sellsNumber FROM tickets INNER JOIN ticket_sells ON tickets.id = ticket_sells.ticketId GROUP BY tickets.type"
        );
      } else if (query === 'sells-by-category') {
        result = await this.db.executeQuery(
          "SELECT tickets.category AS category, COUNT(*) AS sellsNumber FROM tickets INNER JOIN ticket_sells ON tickets.id = ticket_sells.ticketId GROUP BY tickets.category"
        );
      } else if (query === 'turnover-by-type') {
        result = await this.db.executeQuery(
          "SELECT tickets.type AS type, IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) GROUP BY tickets.type"
        );
      } else if (query === 'turnover-by-category') {
        result = await this.db.executeQuery(
          "SELECT tickets.category AS category, IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) GROUP BY tickets.category"
        );
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('tickets/access')
  async getTicketsAccess(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = await this.db.executeQuery(
        `SELECT access.id as "id", readers.label as "reader", readers.ip as "ip", zones.label AS "zone", access.authorised FROM access INNER JOIN readers ON access.readerId=readers.id INNER JOIN zones ON readers.zoneId = zones.id WHERE ticketId=? ORDER BY zone`,
        [id]
      );
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('tickets/access')
  async postTicketsAccess(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const id = req.query.id as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'update-toggle') {
        result = await this.db.executeQuery('UPDATE access SET authorised=? WHERE id=?', [data.authorised, id]);
      } else if (operation === 'update-scan-number') {
        result = await this.db.executeQuery('UPDATE zone_scans SET scanNumber=? WHERE id=?', [data.scanNumber, id]);
      } else if (operation === 'init-zones') {
        await this.db.executeQuery('DELETE FROM zone_scans WHERE ticketId=?', [id]);
        const zones = await this.db.executeQuery("SELECT zones.id AS 'zoneId', zones.label AS 'label' FROM zones");
        for (const zone of zones) {
          await this.db.executeQuery('INSERT INTO zone_scans(ticketId, zoneId) VALUES(?, ?)', [parseInt(id), zone.zoneId]);
        }
      } else if (operation === 'get-zone-scans') {
        result = await this.db.executeQuery(
          "SELECT s.id AS 'Id', s.ticketId AS 'ticketId', s.zoneId AS 'zoneId', s.scanNumber AS 'scanNumber', z.label AS 'zoneLabel' FROM zone_scans s INNER JOIN zones z ON s.zoneId = z.id WHERE s.ticketId = ?",
          [id]
        );
      } else if (operation === 'init-readers') {
        result = await this.db.executeQuery('DELETE FROM access WHERE ticketId=?', [id]);
      } else if (operation === 'activate-zone-readers') {
        const readers = await this.db.executeQuery(
          "SELECT readers.id AS 'readerId', readers.label AS 'label', readers.ip AS 'ip', zones.id AS 'zoneId', zones.label AS 'zone' FROM readers INNER JOIN zones ON zoneId = zones.id WHERE zoneId = ?",
          [data.zoneId]
        );
        for (const r of readers) {
          await this.db.executeQuery('INSERT INTO access(ticketId, readerId, authorised) VALUES(?, ?, ?)', [parseInt(id), r.readerId, true]);
        }
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('tickets/access/scans')
  async getTicketsAccessScans(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = await this.db.executeQuery(
        "SELECT s.id AS 'id', s.ticketId AS 'ticketId', s.zoneId AS 'zoneId', s.scanNumber AS 'scanNumber', z.label AS 'zoneLabel' FROM zone_scans s INNER JOIN zones z ON s.zoneId = z.id WHERE s.ticketId = ?",
        [id]
      );
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('tickets/assignments')
  async getAssignments(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      let result: any = {};
      if (id) {
        result = await this.db.executeQuery(
          'SELECT a.id, a.userId, a.ticketId, a.assigned, a.illimited, a.quota, u.firstName, u.lastName, t.category, t.type FROM assignments a INNER JOIN users u ON a.userId = u.id INNER JOIN tickets t ON a.ticketId = t.id WHERE a.id=?',
          [id]
        );
      } else {
        result = await this.db.executeQuery(
          'SELECT a.id, a.userId, a.ticketId, a.assigned, a.illimited, a.quota, u.firstName, u.lastName, t.category, t.type FROM assignments a INNER JOIN users u ON a.userId = u.id INNER JOIN tickets t ON a.ticketId = t.id'
        );
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('tickets/assignments')
  async postAssignments(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'create') {
        result = await this.db.executeQuery(
          'INSERT INTO assignments(userId, ticketId, illimited, quota) VALUES(?, ?, ?, ?)',
          [data.userId, data.ticketId, data.illimited, data.quota]
        );
      } else if (operation === 'update') {
        const id = req.query.id as string;
        result = await this.db.executeQuery('UPDATE assignments SET illimited=?, quota=? WHERE id=?', [data.illimited, data.quota, id]);
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('tickets/assignments')
  async deleteAssignments(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = await this.db.executeQuery('DELETE FROM assignments WHERE id=?', [id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('tickets/canvas')
  async getCanvas(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const id = req.query.id as string;
      let result: any = {};

      if (operation === 'get-canvas') {
        result = await this.db.executeQuery('SELECT * FROM canvas WHERE ticketId = ?', [id]);
      } else if (operation === 'get-positions') {
        result = await this.db.executeQuery('SELECT * FROM positions WHERE canvasId = ?', [id]);
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('tickets/canvas')
  async postCanvas(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'update-position-status') {
        result = await this.db.executeQuery('UPDATE positions set isActive=? WHERE id=?', [data.isActive, req.query.id]);
      } else if (operation === 'update-position-params') {
        result = await this.db.executeQuery('UPDATE positions set color=?, price=? WHERE id=?', [data.color, data.price, req.query.id]);
      } else if (operation === 'init-canvas') {
        const ticketId = req.query.ticketId as string;
        await this.db.executeQuery('DELETE FROM canvas WHERE ticketId = ?', [ticketId]);
        result = await this.db.executeQuery(
          'INSERT INTO canvas(xPositionsNumber, yPositionsNumber, colorsNumber, label, ticketId) VALUES(?, ?, ?, ?, ?)',
          [data.xPositionsNumber, data.yPositionsNumber, data.colorsNumber, data.label, ticketId]
        );
        const canvasId = result.insertId;
        for (let x = 1; x <= data.xPositionsNumber; x++) {
          for (let y = 1; y <= data.yPositionsNumber; y++) {
            await this.db.executeQuery(
              'INSERT INTO positions(x, y, color, price, canvasId) VALUES(?, ?, ?, ?, ?)',
              [x, y, '#22c55e', 0, canvasId]
            );
          }
        }
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('tickets/discounts')
  async getDiscounts(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      let result: any = {};
      if (id) {
        result = await this.db.executeQuery('SELECT * FROM discounts WHERE id=?', [id]);
      } else {
        result = await this.db.executeQuery('SELECT * FROM discounts');
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('tickets/discounts')
  async postDiscounts(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'create') {
        result = await this.db.executeQuery(
          'INSERT INTO discounts(startDatetime, stopDatetime, rate, ticketId) VALUES (?, ?, ?, ?)',
          [data.startDatetime, data.stopDatetime, parseFloat(data.rate), parseInt(data.ticketId)]
        );
      } else if (operation === 'update') {
        const id = req.query.id as string;
        result = await this.db.executeQuery(
          'UPDATE discounts SET startDatetime=?, stopDatetime=?, rate=? WHERE id = ?',
          [data.startDatetime, data.stopDatetime, data.rate, id]
        );
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('tickets/discounts')
  async deleteDiscounts(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = await this.db.executeQuery('DELETE FROM discounts WHERE id=?', [id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('tickets/online-sells')
  async postOnlineSells(@Req() req: Request, @Res() res: Response) {
    try {
      const data = req.body;
      let result: any = {};
      if (data && Array.isArray(data)) {
        for (const item of data) {
          result = await this.db.executeQuery(
            'INSERT INTO ticket_sells(quantity, validityStartDatetime, validityStopDatetime, allowedScanNumber, ticketId, paiementType, userId) VALUES(?, ?, ?, ?, ?, ?, ?)',
            [item.quantity, item.validityStartDatetime, item.validityStopDatetime, item.allowedScanNumber, item.ticketId, item.paiementType, item.userId]
          );
        }
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('tickets/scans')
  async getScans(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = await this.db.executeQuery('SELECT * FROM scans WHERE ticketSellId=?', [id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('tickets/scans')
  async postScans(@Req() req: Request, @Res() res: Response) {
    try {
      const ticketSellId = req.query.ticketSellId as string;
      const ticketId = req.query.ticketId as string;
      const readerIP = req.query.readerIP as string;

      const result = await this.accessControl.validateAndRegisterScan(ticketSellId, ticketId, readerIP);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  // ----------------------------------------------------
  // SETTINGS & METADATA (Categories, Departments, Zones, Readers, SMTP, Printables)
  // ----------------------------------------------------
  @Get('categories')
  async getCategories(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = id 
        ? await this.db.executeQuery('SELECT * FROM categories WHERE id=?', [id])
        : await this.db.executeQuery('SELECT * FROM categories');
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('categories')
  async postCategories(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};
      if (operation === 'create') {
        result = await this.db.executeQuery('INSERT INTO categories(label, description) VALUES (?, ?)', [data.label, data.description]);
      } else if (operation === 'update') {
        result = await this.db.executeQuery('UPDATE categories SET label=?, description=? WHERE id = ?', [data.label, data.description, req.query.id]);
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('categories')
  async deleteCategories(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.db.executeQuery('DELETE FROM categories WHERE id=?', [req.query.id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('departments')
  async getDepartments(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = id 
        ? await this.db.executeQuery('SELECT * FROM departments WHERE id=?', [id])
        : await this.db.executeQuery('SELECT * FROM departments');
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('departments')
  async postDepartments(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};
      if (operation === 'create') {
        result = await this.db.executeQuery('INSERT INTO departments(label, description) VALUES (?, ?)', [data.label, data.description]);
      } else if (operation === 'update') {
        result = await this.db.executeQuery('UPDATE departments SET label=?, description=? WHERE id = ?', [data.label, data.description, req.query.id]);
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('departments')
  async deleteDepartments(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.db.executeQuery('DELETE FROM departments WHERE id=?', [req.query.id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('zones')
  async getZones(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = id 
        ? await this.db.executeQuery('SELECT * FROM zones WHERE id=?', [id])
        : await this.db.executeQuery('SELECT * FROM zones');
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('zones')
  async postZones(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};
      if (operation === 'create') {
        result = await this.db.executeQuery('INSERT INTO zones(label, description) VALUES (?, ?)', [data.label, data.description]);
      } else if (operation === 'update') {
        result = await this.db.executeQuery('UPDATE zones SET label=?, description=? WHERE id = ?', [data.label, data.description, req.query.id]);
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('zones')
  async deleteZones(@Res() res: Response) {
    try {
      // In nextjs it deletes all zones
      const result = await this.db.executeQuery('DELETE FROM zones');
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('readers')
  async getReaders(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = id 
        ? await this.db.executeQuery('SELECT readers.id, readers.label, readers.ip, readers.zoneId, zones.label AS "zone" FROM readers INNER JOIN zones ON readers.zoneId = zones.id WHERE readers.id=?', [id])
        : await this.db.executeQuery('SELECT readers.id, readers.label, readers.ip, readers.zoneId, zones.label AS "zone" FROM readers INNER JOIN zones ON readers.zoneId = zones.id');
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('readers')
  async postReaders(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};
      if (operation === 'create') {
        result = await this.db.executeQuery('INSERT INTO readers(label, ip, zoneId) VALUES (?, ?, ?)', [data.label, data.ip, data.zoneId]);
      } else if (operation === 'update') {
        result = await this.db.executeQuery('UPDATE readers SET label=?, ip=?, zoneId=? WHERE id=?', [data.label, data.ip, data.zoneId, req.query.id]);
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('readers')
  async deleteReaders(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.db.executeQuery('DELETE FROM readers WHERE id=?', [req.query.id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('printables')
  async getPrintables(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const operation = req.query.operation as string;
      let result: any = {};

      if (operation === 'get-active') {
        result = await this.db.executeQuery('SELECT * FROM printables WHERE status=TRUE');
      } else if (id) {
        result = await this.db.executeQuery('SELECT * FROM printables WHERE id=?', [id]);
      } else {
        result = await this.db.executeQuery('SELECT * FROM printables');
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('printables')
  async postPrintables(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'create') {
        result = await this.db.executeQuery(
          'INSERT INTO printables(size, width, height , orientation, elementAX, elementAY, elementBX, elementBY, elementCX, elementCY, elementDX, elementDY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [data.size, data.width, data.height , data.orientation, data.elementAX, data.elementAY, data.elementBX, data.elementBY, data.elementCX, data.elementCY, data.elementDX, data.elementDY]
        );
      } else if (operation === 'update') {
        result = await this.db.executeQuery(
          'UPDATE printables SET size = ?, width = ?, height = ?, orientation = ?, elementAX = ?, elementAY = ?, elementBX = ?, elementBY = ?, elementCX = ?, elementCY = ?, elementDX = ?, elementDY = ? WHERE id = ?',
          [data.size, data.width, data.height , data.orientation, data.elementAX, data.elementAY, data.elementBX, data.elementBY, data.elementCX, data.elementCY, data.elementDX, data.elementDY , req.query.id]
        );
      } else if (operation === 'set-active') {
        await this.db.executeQuery('UPDATE printables SET status = FALSE');
        result = await this.db.executeQuery('UPDATE printables SET status = TRUE WHERE id = ?', [req.query.id]);
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('printables')
  async deletePrintables(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.db.executeQuery('DELETE FROM printables WHERE id=?', [req.query.id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('smtp-config')
  async getSmtpConfig(@Res() res: Response) {
    try {
      const result = await this.db.executeQuery(
        'SELECT host, port, secure, user, password, fromEmail FROM smtp_config WHERE id=1'
      );
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('smtp-config')
  async postSmtpConfig(@Req() req: Request, @Res() res: Response) {
    try {
      const data = req.body;
      const result = await this.db.executeQuery(
        'UPDATE smtp_config SET host=?, port=?, secure=?, user=?, password=?, fromEmail=? WHERE id=1',
        [data.host, parseInt(data.port), data.secure ? 1 : 0, data.user, data.password, data.fromEmail]
      );
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  // ----------------------------------------------------
  // PORTAL PASS SUBSCRIPTIONS & REPORTS & STOCK
  // ----------------------------------------------------
  @Get('pass-subscriptions')
  async getPassSubscriptions(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = id
        ? await this.db.executeQuery('SELECT p.*, u.firstName, u.lastName, u.email FROM pass_subscriptions p INNER JOIN users u ON p.userId = u.id WHERE p.id=?', [id])
        : await this.db.executeQuery('SELECT p.*, u.firstName, u.lastName, u.email FROM pass_subscriptions p INNER JOIN users u ON p.userId = u.id');
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('pass-subscriptions')
  async postPassSubscriptions(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'create') {
        result = await this.db.executeQuery(
          'INSERT INTO pass_subscriptions(holderFirstName, holderLastName, holderIdentityNumber, holderBirthDate, startDatetime, stopDatetime, allowedScanNumber, status, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [data.holderFirstName, data.holderLastName, data.holderIdentityNumber, data.holderBirthDate, data.startDatetime, data.stopDatetime, data.allowedScanNumber, data.status, data.userId]
        );
      } else if (operation === 'update') {
        result = await this.db.executeQuery(
          'UPDATE pass_subscriptions SET holderFirstName=?, holderLastName=?, holderIdentityNumber=?, holderBirthDate=?, startDatetime=?, stopDatetime=?, allowedScanNumber=?, status=?, userId=? WHERE id=?',
          [data.holderFirstName, data.holderLastName, data.holderIdentityNumber, data.holderBirthDate, data.startDatetime, data.stopDatetime, data.allowedScanNumber, data.status, data.userId, req.query.id]
        );
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('pass-subscriptions')
  async deletePassSubscriptions(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.db.executeQuery('DELETE FROM pass_subscriptions WHERE id=?', [req.query.id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('reports')
  async getReports(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const id = req.query.id as string;
      const userId = req.query.userId as string;
      let result: any = {};

      if (operation === 'get-daily-cashier-turnover') {
        result = await this.db.executeQuery(
          "SELECT MAX(sells.datetime) AS 'date', SUM(tickets.price) AS 'turnover', SUM(tickets.price)*0.2 AS 'VAT', MAX(users.firstName) AS firstName, MAX(users.lastName) AS lastName FROM ticket_sells AS sells INNER JOIN tickets as tickets ON tickets.id = sells.ticketId INNER JOIN users ON users.id=sells.userId WHERE sells.userId = ? AND DATE(sells.datetime) = DATE(NOW())",
          [id]
        );
      } else if (operation === 'get-daily-cashier-turnover-by-group') {
        result = await this.db.executeQuery(
          "SELECT MAX(sells.datetime) AS 'date', SUM(tickets.price) AS 'turnover', SUM(tickets.price)*0.2 AS 'VAT', sells.paiementType AS 'paiementType', MAX(users.firstName) AS firstName, MAX(users.lastName) AS lastName FROM ticket_sells AS sells INNER JOIN tickets as tickets ON tickets.id = sells.ticketId INNER JOIN users ON users.id=sells.userId WHERE sells.userId = ? AND DATE(sells.datetime) = DATE(NOW()) GROUP BY sells.paiementType",
          [id]
        );
      } else if (operation === 'get-daily-chief-report') {
        result = await this.db.executeQuery(
          "SELECT * FROM daily_reports INNER JOIN users ON users.id=daily_reports.userId WHERE daily_reports.userId=?",
          [id]
        );
      } else if (operation === 'get-all') {
        result = await this.db.executeQuery("SELECT * FROM daily_reports WHERE userId=?", [userId]);
      } else if (operation === 'get-one') {
        result = await this.db.executeQuery(
          "SELECT * FROM daily_reports INNER JOIN users ON daily_reports.userId=users.id WHERE daily_reports.id=?",
          [id]
        );
      }

      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('reports')
  async postReports(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'create') {
        result = await this.db.executeQuery(
          "INSERT INTO daily_reports(cashTurnover, TPETurnover, webTurnover, checkTurnover, turnover, P200D, P100D, P50D, P20D, P10D, P5D, P2D, P1D, P50C, P20C, P10C, P5C, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [data.cashTurnover, data.TPETurnover, data.webTurnover, data.checkTurnover, data.turnover, data.P200D, data.P100D, data.P50D, data.P20D, data.P10D, data.P5D, data.P2D, data.P1D, data.P50C, data.P20C, data.P10C, data.P5C, data.userId]
        );
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('reports')
  async deleteReports(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.db.executeQuery('DELETE FROM daily_reports WHERE id=?', [req.query.id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('quota')
  async getQuota(@Res() res: Response) {
    // quota dummy get
    return res.status(HttpStatus.OK).json({ result: [] });
  }

  @Post('quota')
  async postQuota(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'get-quota-infos') {
        result = await this.db.executeQuery(
          "SELECT a.ticketId, a.assigned, a.illimited, a.quota, COALESCE(sells.sellsNumber, 0) AS 'sellsNumber' FROM assignments a LEFT JOIN (SELECT ticketId, COUNT(id) AS sellsNumber FROM ticket_sells WHERE userId = ? GROUP BY ticketId) sells ON a.ticketId = sells.ticketId WHERE a.userId = ?",
          [data.userId, data.userId]
        );
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  // ----------------------------------------------------
  // ARTICLES & STOCK ENDPOINTS
  // ----------------------------------------------------
  @Get('articles')
  async getArticles(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = id 
        ? await this.db.executeQuery('SELECT * FROM articles WHERE id=?', [id])
        : await this.db.executeQuery('SELECT * FROM articles');
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('articles')
  async postArticles(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'create') {
        result = await this.db.executeQuery(
          "INSERT INTO articles(reference, category, label, price, VATRate, warehousing, availableQuantity, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [data.reference, data.category, data.label, data.price, data.VATRate, data.warehousing, data.availableQuantity, data.description, data.image]
        );
      } else if (operation === 'update') {
        result = await this.db.executeQuery(
          'UPDATE articles SET reference=?, category=?, label=?, price=?, VATRate=?, warehousing=?, availableQuantity=?, description=?, image=? WHERE id = ?',
          [data.reference, data.category, data.label, data.price, data.VATRate, data.warehousing, data.availableQuantity, data.description, data.image, req.query.id]
        );
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('articles')
  async deleteArticles(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.db.executeQuery('DELETE FROM articles WHERE id=?', [req.query.id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('articles/sells')
  async getArticlesSells(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = id 
        ? await this.db.executeQuery(
            "SELECT sells.id AS id, sells.datetime AS datetime, sells.quantity AS quantity, articles.category AS category, articles.price AS price, articles.label AS label, articles.VATRate AS VATRate, users.firstName AS firstName, users.lastName AS lastName FROM article_sells AS sells INNER JOIN articles as articles ON articles.id = sells.articleId INNER JOIN users ON users.id=sells.userId WHERE sells.id=?",
            [id]
          )
        : await this.db.executeQuery(
            "SELECT sells.id AS id, sells.datetime AS datetime, sells.quantity AS quantity, articles.category AS category, articles.price AS price, articles.label AS label, articles.VATRate AS VATRate FROM article_sells AS sells INNER JOIN articles as articles ON articles.id = sells.articleId ORDER BY datetime DESC"
          );
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('articles/sells')
  async postArticlesSells(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      let result: any = {};

      if (operation === 'sell') {
        const data = req.body;
        if (data && Array.isArray(data)) {
          for (const item of data) {
            await this.db.executeQuery("UPDATE articles SET availableQuantity = availableQuantity - ? WHERE id = ?", [item.quantity, item.articleId]);
            result = await this.db.executeQuery(
              'INSERT INTO article_sells(quantity, articleId, paiementType, userId) VALUES(?, ?, ?, ?)',
              [item.quantity, item.articleId, item.paiementType, item.userId]
            );
          }
        }
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Get('supplies')
  async getSupplies(@Req() req: Request, @Res() res: Response) {
    try {
      // It returns the list of supply logs
      const result = await this.db.executeQuery(
        "SELECT s.id, s.datetime, s.supplyQuantity, s.comment, a.label AS articleLabel, u.firstName, u.lastName FROM supplies s INNER JOIN articles a ON s.articleId = a.id INNER JOIN users u ON s.userId = u.id ORDER BY s.datetime DESC"
      );
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('supplies')
  async postSupplies(@Req() req: Request, @Res() res: Response) {
    try {
      const data = req.body;
      await this.db.executeQuery("UPDATE articles SET availableQuantity = availableQuantity + ? WHERE id = ?", [data.supplyQuantity, data.articleID]);
      const result = await this.db.executeQuery(
        "INSERT INTO supplies(articleId, userId, supplyQuantity, comment) VALUES (?, ?, ?, ?)",
        [data.articleID, data.userId, data.supplyQuantity, data.comment]
      );
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD & PROFILES
  // ----------------------------------------------------
  @Get('manager/dashboard')
  async getManagerDashboard(@Res() res: Response) {
    try {
      const ticketRevenue = await this.db.executeQuery(
        "SELECT SUM(t.price) AS total FROM ticket_sells ts JOIN tickets t ON ts.ticketId = t.id WHERE ts.canceled = 0 OR ts.canceled IS NULL"
      );
      const ticketSales = (ticketRevenue && ticketRevenue[0] && ticketRevenue[0].total) || 0;

      const articleRevenue = await this.db.executeQuery(
        "SELECT SUM(s.quantity * a.price) AS total FROM article_sells s JOIN articles a ON s.articleId = a.id"
      );
      const articleSales = (articleRevenue && articleRevenue[0] && articleRevenue[0].total) || 0;

      const totalSales = parseFloat(ticketSales) + parseFloat(articleSales);

      const scansResult = await this.db.executeQuery("SELECT COUNT(*) AS total FROM scans");
      const totalScans = (scansResult && scansResult[0] && scansResult[0].total) || 0;

      const passResult = await this.db.executeQuery("SELECT COUNT(*) AS total FROM pass_subscriptions WHERE status = 'Actif'");
      const activePass = (passResult && passResult[0] && passResult[0].total) || 0;

      const lowStockResult = await this.db.executeQuery("SELECT COUNT(*) AS total FROM articles WHERE availableQuantity < 10");
      const lowStockCount = (lowStockResult && lowStockResult[0] && lowStockResult[0].total) || 0;

      const recentSales = await this.db.executeQuery(
        "SELECT ts.id, ts.datetime, t.category, t.type, t.price, u.firstName, u.lastName FROM ticket_sells ts JOIN tickets t ON ts.ticketId = t.id LEFT JOIN users u ON ts.userId = u.id ORDER BY ts.datetime DESC LIMIT 5"
      );
      const recentScans = await this.db.executeQuery(
        "SELECT s.id, s.datetime, 'Accepté' AS status, z.label AS zoneLabel FROM scans s LEFT JOIN zones z ON s.zoneId = z.id ORDER BY s.datetime DESC LIMIT 5"
      );

      return res.status(HttpStatus.OK).json({
        success: true,
        data: {
          totalSales: totalSales.toFixed(2),
          totalScans,
          activePass,
          lowStockCount,
          recentSales: Array.isArray(recentSales) ? recentSales : [],
          recentScans: Array.isArray(recentScans) ? recentScans : []
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message || error });
    }
  }

  @Get('profiles')
  async getProfiles(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.query.id as string;
      const result = id
        ? await this.db.executeQuery('SELECT * FROM profiles WHERE id=?', [id])
        : await this.db.executeQuery('SELECT * FROM profiles');
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Post('profiles')
  async postProfiles(@Req() req: Request, @Res() res: Response) {
    try {
      const operation = req.query.operation as string;
      const data = req.body;
      let result: any = {};

      if (operation === 'create') {
        result = await this.db.executeQuery("INSERT INTO profiles(label, description) VALUES (?, ?)", [data.label, data.description]);
      } else if (operation === 'update') {
        result = await this.db.executeQuery('UPDATE profiles SET label=?, description=? WHERE id = ?', [data.label, data.description, req.query.id]);
      }
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }

  @Delete('profiles')
  async deleteProfiles(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.db.executeQuery('DELETE FROM profiles WHERE id=?', [req.query.id]);
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message || error });
    }
  }
}
