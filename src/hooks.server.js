/** @type {import('@sveltejs/kit').HandleFetch} */
// export async function handleFetch({ event, request, fetch }) {
//     const cookie = event.cookies.get('Authorization')

//     request.headers.set("Authorization", cookie)   
//     return fetch(request);
//   }

/** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) {
//     const cookies = event.cookies.get("Authorization");
//     console.log("handle/cookies", cookies);
  
//     // go into the original endpoint
//     // access the cookie val with  event.local.thing
//     const response = await resolve(event);
  
//     response.headers.append("set-cookie", cookies);
  
//     return response;
//   }