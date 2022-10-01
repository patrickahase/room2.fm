import './App.css';
import IntroModal from './components/introModal';

function App() {

  const [currentModalPage, setCurrentModalPage] = useState(0);
  const [introModal, setIntroModal] = useState(null);

  return (
    <div className="App">
      <IntroModal
        setIntroModal={setIntroModal}
        currentModalPage={currentModalPage}
        setCurrentModalPage={setCurrentModalPage}
      />
    </div>
  );
}

export default App;
