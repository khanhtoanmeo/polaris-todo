import { TopBar } from "@shopify/polaris";

function MyTopBar() {
  const userMenuMarkup = (
    <TopBar.UserMenu name="Toan" detail="Toan Yasuo" initials="T" />
  );

  return <TopBar userMenu={userMenuMarkup} />;
}

export default MyTopBar;
