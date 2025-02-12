import { registerRootComponent } from 'expo';

import App from './src/app/App';
import './src/shared/i18n/i18n'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
