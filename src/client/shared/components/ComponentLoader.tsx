import React from "react";

interface Props {
  component: any;
}

export function ComponentLoader({ component }: Props) {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      {component}
    </React.Suspense>
  );
}