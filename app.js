import express from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import addressUserRoutes from './src/routes/user/addressUserRoutes';
import userRoutes from './src/routes/user/userRoutes';
import userImageRoutes from './src/routes/user/userImageRoutes';
import autosRoutes from './src/routes/user/autosRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import autoImageRoutes from './src/routes/user/autoImageRoutes';
import serviceProviderRoutes from './src/routes/service-provider/serviceProviderRoutes';
import serviceProviderImageRoutes from './src/routes/service-provider/serviceProviderImageRoutes';
import addressServiceProviderRoutes from './src/routes/service-provider/addressServicesProvidersRoutes';
import employeeRoutes from './src/routes/service-provider/employeeRoutes';
import solicitationRoutes from './src/routes/default/solicitationRoutes';
import solicitationImageRoutes from './src/routes/default/solicitationImageRoutes';
import serviceCategoryRoutes from './src/routes/default/serviceCategoryRoutes';
import paymentFormRoutes from './src/routes/default/paymentFormRoutes';
import './src/database';

const cors = require('cors');

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
    this.app.use(cors());
  }

  routes() {
    this.app.use('/users/', userRoutes);
    this.app.use('/userImage/', userImageRoutes);
    this.app.use('/addressUser/', addressUserRoutes);
    this.app.use('/autos/', autosRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/autoImage/', autoImageRoutes);
    this.app.use('/serviceProvider/', serviceProviderRoutes);
    this.app.use('/addressServiceProvider/', addressServiceProviderRoutes);
    this.app.use('/serviceProviderImage/', serviceProviderImageRoutes);
    this.app.use('/employees/', employeeRoutes);
    this.app.use('/solicitations/', solicitationRoutes);
    this.app.use('/serviceCategory/', serviceCategoryRoutes);
    this.app.use('/paymentForm/', paymentFormRoutes);
    this.app.use('/solicitationImage/', solicitationImageRoutes);
  }
}

export default new App().app;
