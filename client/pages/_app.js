import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import '../styles/globals.css';
import Header from '../components/header';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// const AppComponent = ({ Component, pageProps, currentUser }) => {
//   const router = useRouter()
//   const isAdminRoute = router.pathname.startsWith('/admin');
//   const isHomeRoute = router.pathname.startsWith('/auth');


//   // useEffect(() => {
//   //   // Redirect user to the sign-in page if not signed in and trying to access a restricted route
//   //   if (!currentUser && isTicketOrderRoute) {
//   //     router.push('/signin'); // Assuming '/signin' is your sign-in route
//   //   }
//   // }, [currentUser, isTicketOrderRoute, router]);

//   return (
//     <div>
//       {!isAdminRoute && !isHomeRoute && <Header currentUser={currentUser} />}
//       <div className={isHomeRoute ? '' : 'container'}>
//         <Component currentUser={currentUser} {...pageProps} />
//       </div>
//     </div>
//   );
// };


// AppComponent.getInitialProps = async (appContext) => {
//   const client = buildClient(appContext.ctx);
//   const { data } = await client.get('/api/users/currentuser');

//   let pageProps = {};
//   if (appContext.Component.getInitialProps) {
//     pageProps = await appContext.Component.getInitialProps(
//       appContext.ctx,
//       client,
//       data.currentUser
//     );
//   }

//   return {
//     pageProps,
//     ...data,
//   };
// };

// export default AppComponent;


const AppComponent = ({ Component, pageProps, currentUser }) => {
  const router = useRouter()
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isHomeRoute = router.pathname.startsWith('/auth');
  return (
    <div>
       {!isAdminRoute && !isHomeRoute && <Header currentUser={currentUser} />}
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
