import { auth } from "../firebase.js";

export async function login(email,password){

    return await auth.signInWithEmailAndPassword(
        email,
        password
    );

}

export async function register(email,password){

    return await auth.createUserWithEmailAndPassword(
        email,
        password
    );

}

export async function logout(){

    return await auth.signOut();

}

export function observeUser(callback){

    auth.onAuthStateChanged(callback);

}