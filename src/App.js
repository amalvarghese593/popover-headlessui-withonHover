import "./App.css";
import { PopoverCustom } from "./components/Popover";

function App() {
  const options = [
    {
      item: "Analytics",
    },
    {
      item: "Engagement",
    },
    {
      item: "Security",
    },
    {
      item: "Integrations",
    },
  ];
  return (
    <div className="App">
      <PopoverCustom
        label="Solutions"
        options={options}
        getValue={(o) => o.item}
      />
    </div>
  );
}

export default App;
