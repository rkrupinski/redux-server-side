import * as React from 'react';
import { useParams } from 'react-router-dom';

import { EmptyObject } from '@rss/shared/src/types';
import { Loader } from '@rss/app/src/components/Loader';
import { RouteComponent } from '@rss/app/src/types';
import { useDispatch } from '@rss/app/src/hooks';

export const makeResolver = () => {
  let isInitialRender = true;

  return function resolver<R = EmptyObject, P = EmptyObject>(
    component: RouteComponent<R, P>,
    fallback: React.FC = Loader,
  ): React.FC<P> {
    return function ComponentWithResolver(props) {
      const Component = component;
      const FallbackComponent = fallback;
      const resolver = Component.resolveDependencies;
      const [resolved, setResolved] = React.useState(isInitialRender);

      const routeParams = useParams<R>();
      const dispatch = useDispatch();

      React.useEffect(() => {
        if (resolved) {
          isInitialRender = false;
          return () => {
            //
          };
        }

        let active = true;

        const resolve = async () => {
          try {
            !!resolver && (await dispatch(resolver(routeParams)));
          } catch (err) {
            // Error already handled
          } finally {
            if (active) setResolved(true);
          }
        };

        resolve();

        return () => {
          active = false;
        };
      }, [resolved, dispatch, resolver, routeParams, setResolved]);

      return resolved ? <Component {...props} /> : <FallbackComponent />;
    };
  };
};
