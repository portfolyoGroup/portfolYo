// import React, { useState, useEffect } from 'react';
// import Delay from 'react-delay';
// import { auth } from '../firebase';


// const useAuthentication = (props) => {
//     [providerData, setProviderData] = useState([])
//     useEffect(() => {
//         auth.getAuth().onAuthStateChanged(user => {
//             if (user !== null) {
//                 setProviderData(user.providerData)
//             } else {
//                 console.info('Must be authenticated');
//                 props.history.push('/'); // redirects to '/', see 'Programmatically navigate with React Router'
//             }
//         });
//     }, [])

//     return (
//         providerData.length > 0
//             ? <WrappedComponent {...props} providerData={providerData} />
//             : <Delay wait={250}>
//                 <p>Loading...</p>
//             </Delay>
//     )
// }
// export default useAuthentication
