import React from "react";
import { DatesT, fetchDates } from "./api";
import Loader from "./components/Loader";
import Main from "./components/Main";

const AppInitializer = React.lazy(async () => {
  let dates: DatesT | undefined;

  const promise = new Promise<void>((resolve) => {
    fetchDates().then((result) => {
      dates = result;
      resolve();
    });
  });

  if (!dates) await promise;

  function Main_() {
    return <Main dates={dates} />;
  }

  return {
    default: Main_,
  };
});

function AppSuspense() {
  return (
    <React.Suspense fallback={<Loader />}>
      <AppInitializer />
    </React.Suspense>
  );
}

export default AppSuspense;
