import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import routes from './routes';
import { configurePassport } from './middlewares/passport-strategies';
import { clientHandler, CLIENT_ROUTES } from './middlewares/client-handlers';
import { globalErrors, notFoundHandler } from './middlewares/error-handlers';

const app = express();

configurePassport(app);
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

app.use(routes);
app.get(CLIENT_ROUTES, clientHandler);

app.use(notFoundHandler);
app.use(globalErrors);
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
