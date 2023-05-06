// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";


// dotenv.config();

// console.log("secret is", process.env.ACCESS_TOKEN_SECRET);



// const services = {
//     /**
//      *
//      * @param {Object} credentials
//      * @returns {Promise} jwt
//      */
//     login: function (credentials) {
//         let newCredentials = this.decodeCredentials(credentials);


//         const userCredentials = [newCredentials.login, newCredentials.login];
//         return new Promise((resolve, reject) => {
//             connection.query(
//                 "SELECT COUNT(*) as nbComptes, ID_Utilisateur FROM Utilisateurs WHERE Utilisateurs.Email = ? OR Utilisateurs.Telephone = ?",
//                 userCredentials,
//                 (err, results) => {
//                     if (err) {
//                         reject(err);
//                         return;
//                     }

//                     if (Number(results[0].nbComptes) === 1) {
//                         connection.query(
//                             "SELECT MotDePasse FROM Utilisateurs WHERE ID_Utilisateur = ?",
//                             [results[0].ID_Utilisateur],
//                             (err1, results1) => {
//                                 if (err) {
//                                     reject(err1);
//                                     return;
//                                 }

//                                 if (
//                                     bcrypt.compareSync(
//                                         newCredentials.password,
//                                         results1[0].MotDePasse
//                                     )
//                                 ) {
//                                     resolve(this.createJWT(results[0].ID_Utilisateur));
//                                 }
//                             }
//                         );
//                     }
//                 }
//             );
//         });
//     },
//     /**
//      *
//      * @param {Object} credentials
//      * @returns {Promise} status
//      */
//     signup: function (credentials) {
//         console.log(credentials);
//         return new Promise((resolve, reject) => {

//             // Vérifier si l'adresse email existe déjà dans la base de données

//             // Faire LA TRADUCTION SUR MONGOOSE
//             connection.query("SELECT COUNT(*) AS email_count FROM `Utilisateurs` WHERE `Email` = ? OR `Pseudo`= ?", credentials.email, (err, rows) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 const email_count = rows[0].email_count;
//                 const pseudo_count = rows[0].pseudo_count;

//                 // Si l'adresse email ou le pseudo existe déjà, renvoyer une erreur
//                 if (email_count > 0 || pseudo_count > 0) {
//                     reject(new Error("Email ou pseudo déjà enregistré"));
//                     return;
//                 }
//             });
      
//             this.hashPassword(credentials.password)
//                 .then(pwd => {
//                     const userCredentials = [credentials.name, credentials.firstname, credentials.email, credentials.tel, credentials.pseudo, pwd];

//                     // REMPLACER PAR LA CO AVEC MONGOOSE
//                     connection.query("INSERT INTO `Utilisateurs`(`Nom`, `Prenom`, `Email`, `Telephone`, `Pseudo`, `MotDePasse`) VALUES (?,?,?,?,?,?)", userCredentials, (err) => {
//                         if (err) {
//                             reject(err);
//                             return;
//                         }
//                         const email_count = rows[0].email_count;
//                         const pseudo_count = rows[0].pseudo_count;

//                         // Si l'adresse email ou le pseudo existe déjà, renvoyer une erreur
//                         if (email_count > 0 || pseudo_count > 0) {
//                             reject(new Error("Email ou pseudo déjà enregistré"));
//                             return;
//                         }
//                     }
//                     );

//                     this.hashPassword(credentials.password).then((pwd) => {
//                         const userCredentials = [
//                             credentials.name,
//                             credentials.firstname,
//                             credentials.email,
//                             credentials.tel,
//                             credentials.pseudo,
//                             pwd,
//                         ];

//                         connection.query(
//                             "INSERT INTO `Utilisateurs`(`Nom`, `Prenom`, `Email`, `Pseudo`, `Telephone`, `MotDePasse`) VALUES (?,?,?,?,?,?)",
//                             userCredentials,
//                             (err) => {
//                                 if (err) {
//                                     reject(err);

//                                     return;
//                                 }
//                                 resolve({ status: 200 });
//                             }
//                         );
//                     });
//                 });
//         }),

//             function decodeCredentials (base64string) {
//                 console.log(base64string);
//                 let buffer = Buffer(base64string, "base64");
//                 let decoded = buffer.toString();

//                 // console.log('"' + base64string + '" converted from Base64 to ASCII is "' + decoded + '"');

//                 let [username, password] = decoded.split(":");
//                 // console.log([username, password]);

//                 return {
//                     login: username,
//                     password: password,
//                 };
//             },

//             function decodeJwt (token) {
//                 return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//             },

//             function createJWT (id) {
//                 const expiresIn = 86400;
//                 return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
//             },

//             /**
//              *
//              * @param {String} password
//              * @returns {String} hashed password
//              */
//             async function hashPassword (password) {
//                 return await bcrypt.hash(password, 10);
//             },

//             /**
//              *
//              * @param {Object} 
//              * @returns {Promise} status
//              */

//              function getHobbyById (hobbyId) {
//                 // return un hobby (musique, film, série ou livre) avec ses caractéristiques en donnant l'id en param

//                 //tableaudeReturn
//                 let arrayReturn = [];
//                 // get info from hobby selected
//                 // Connexion à faire avec Mongoose 
//                 connection.query(
//                     gethobby,
//                     hobbyId,
//                     (errorhobby, resultQueryGetHobby) => {
//                         if (errorhobby) {
//                             console.error(errorhobby);
//                             return;
//                         }
//                         arrayReturn.push(resultQueryGetHobby);
//                     });
                
//                 return resultQueryGetHobby;
//                 }
                     
            
                
            
            

           
//     },
    
//      /**
//              *
//              * @param {String} header
//              * @param {String} auhtZType Basic | Bearer
//              * @returns {Array[int,String]} [status, message]
//              */
//              function checkAuthZHeader (header, auhtZType) {
//                 if (header == null || typeof header !== "string") {
//                     return [400, "En-tête AuthZ manquante"];
//                 }
//                 let authType = header.split(" ")[0];
//                 if (authType != auhtZType) {
//                     return [400, `Utilisez l'AuthZ '${auhtZType}'`];
//                 }
//                 return [200, "En-Têtes Valides"];
//             }


//         },

           



   


// export default services;
