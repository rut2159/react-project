import './App.css';
import MyComponent from './components/NewMyComponet';
import NewComponent from './components/NewComponent';

function App() {
  return (
    <div className="App">
      <MyComponent />
      <div style={{ marginTop: 20 }}>
        <NewComponent
          title={"A friendly new component"}
          onAction={(msg) => console.log('NewComponent action:', msg)}
        />
      </div>
    </div>
  );
}

export default App;
