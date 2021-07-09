import './App.scss';
import ImplementationsComponent from './components/ImplementationsComponent';
import VersionRegistryComponent from './components/VersionRegistryComponent';
import ImplementationRegistryComponent from './components/ImplementationRegistryComponent';
import { Web3ApiProvider } from "@web3api/react";

function App() {
  return (
    
    <div className="App">
    
      <Web3ApiProvider>
        <VersionRegistryComponent />
        
        <ImplementationRegistryComponent />
        
        <ImplementationsComponent />    
      </Web3ApiProvider>
      
    </div>
  );
}

export default App;
