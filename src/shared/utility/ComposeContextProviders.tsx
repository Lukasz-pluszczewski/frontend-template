import React, { ComponentType, ReactNode } from 'react';

type ProviderDefinition<TProps extends {}> = [ComponentType<TProps>, TProps];

type ComposeContextProvidersParams = {
  providers: ProviderDefinition<any>[];
  children?: ReactNode;
}
export const ComposeContextProviders = ({ providers, children }: ComposeContextProvidersParams) => {
  return (
    <>
      {providers.reverse().reduce((acc, [Provider, props]) => {
        return <Provider {...props}>{acc}</Provider>;
      }, children)}
    </>
  );
};
