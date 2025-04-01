import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/react';
import { home, person, people, clipboard, list } from 'ionicons/icons';
import Home from './pages/Home';
import Medico from './pages/Medico';
import Enfermero from './pages/Enfermero';
import Recepcionista from './pages/Recepcionista';
import Paciente from './pages/Paciente';
import Overview from './pages/Overview';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/medico" component={Medico} />
          <Route exact path="/enfermero" component={Enfermero} />
          <Route exact path="/recepcionista" component={Recepcionista} />
          <Route exact path="/paciente" component={Paciente} />
          <Route exact path="/overview" component={Overview} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="medico" href="/medico">
            <IonIcon icon={person} />
            <IonLabel>Médico</IonLabel>
          </IonTabButton>
          <IonTabButton tab="enfermero" href="/enfermero">
            <IonIcon icon={people} />
            <IonLabel>Enfermero</IonLabel>
          </IonTabButton>
          <IonTabButton tab="recepcionista" href="/recepcionista">
            <IonIcon icon={clipboard} />
            <IonLabel>Recepcionista</IonLabel>
          </IonTabButton>
          <IonTabButton tab="paciente" href="/paciente">
            <IonIcon icon={list} />
            <IonLabel>Paciente</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
