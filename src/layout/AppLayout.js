import { Frame } from "@shopify/polaris";
import MyTopBar from "./TopBar";

function AppLayout({ children }) {
  return <Frame topBar={<MyTopBar />}>{children}</Frame>;
}

export default AppLayout;
