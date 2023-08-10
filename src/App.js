import "@shopify/polaris/dist/styles.css";
import { AppProvider } from "@shopify/polaris";
import Todos from "./components/Todos";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <Todos />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
