import './App.css'
import { CharacterComponent} from './components/CharacterComponent';
import { CharacterForm } from './components/CharacterForm';



function App(){
  
  return (
    <div className='app-container'>
      <header className='app-header'> 
        <h1 className="app-title"> Rik and Morty Characters</h1>
        <p className='app-subtitle'> Explore </p>
      </header>
      
      <main className='app-content-single-column'>

        <div className='form-section'>
          <CharacterForm />
        </div>

        <div className='character-section'>
          <CharacterComponent />
        </div>
        
        
      </main>

    </div>
  );
}

export default App;

