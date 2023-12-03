import React, { Suspense } from "react";
const Routes = React.lazy(() => import('./Routes'));

const App = () => {
  return (
    <div className="min-h-[100vh] font-primary bg-neutral_white text-accent_primary">
      <Suspense fallback={<p className="p-6">Loading...</p>}>
        <Routes />
      </Suspense>
    </div>
  );
};

export default App;
