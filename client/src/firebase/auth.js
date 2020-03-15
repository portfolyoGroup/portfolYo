import firebase from './firebase';

export const getAuth = () => {
  return firebase.auth();
};

export const githubOAuth = () => {
  return new firebase.firebase_.auth.GithubAuthProvider();
};

export const googleOAuth = () => {
  return new firebase.firebase_.auth.GoogleAuthProvider();
};

export const facebookOAuth = () => {
  return new firebase.firebase_.auth.FacebookAuthProvider();
}

export const emailRegister = (email, password, firstName, lastName) => firebase.auth().createUserWithEmailAndPassword(email, password);
 // TODO: add name data to database

export const emailLogin = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);