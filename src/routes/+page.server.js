/** @type {import('./$types').PageLoad} */
// export async function load() {
//     console.log("server load run")
//     let user = {};
//     const response = await fetch("http://localhost:3000/validate", {
//         credentials: "include",
//     });
//     if (response.ok) {
//         let content = await response.json();
//         user = content.user;
//     };
//     return {
//         user
//     };
// }

// 

// export async function load() {
// 	let user = await validate();
// 	console.log(user);
// 	return { user };
// }

// async function validate() {
// 	const res = await fetch("http://localhost:3000/validate", {
// 		credentials: 'include',
// 	});
// 	if (res.ok) {
// 		return await res.json();
// 	}
// }