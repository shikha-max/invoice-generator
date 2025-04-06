
import './App.scss';
import { Suspense } from 'react';
import Index from './Invoice/Index'
import Loader from './components/Loader';
import { Provider } from 'react-redux';
import { store } from './store';
import ModalContainer from './container/ModalContainer';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<Loader />}>
          <Index />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <ModalContainer />
        </Suspense>
      </div>
    </Provider>

  );
}

export default App;
