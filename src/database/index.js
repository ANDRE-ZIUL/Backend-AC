import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import AddressUser from '../models/user/AddressUser';
import User from '../models/user/User';
import Auto from '../models/user/Auto';
import ServiceProvider from '../models/service-provider/ServiceProvider';
import AddressServiceProvider from '../models/service-provider/AddressServiceProvider';
import Employee from '../models/service-provider/Employee';
import AutoImage from '../models/user/AutoImage';
import ServiceCategory from '../models/default/serviceCategory';
import Solicitation from '../models/default/solicitation';
import PaymentForm from '../models/default/paymentForm';
import UserImage from '../models/user/UserImage';
import ServiceProviderImage from '../models/service-provider/ServiceProviderImage';
import SolicitationImage from '../models/default/SolicitationImage';

const models = [
  AddressUser,
  User,
  ServiceProvider,
  Employee,
  AddressServiceProvider,
  Auto, AutoImage,
  UserImage,
  Solicitation,
  ServiceCategory,
  PaymentForm,
  ServiceProviderImage,
  SolicitationImage,
];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
