import {Utilisateur, Serveur, Channel, Message, Question, Reponse, Note} from "./types";

function initServeur(){
	const user:Utilisateur = {pseudo:"superCodeur", status:"Deconnecte", points:5};
	const serveur:Serveur = {utilisateurs:[user], channels:[], messages:[]};
	return serveur;
}

function nouvelUtilisateur(serveur:Serveur, pseudo:String){
	const user:Utilisateur = {pseudo:pseudo, status: "Deconnecte", points:0};
	serveur.utilisateurs.push(user);
	return serveur;
}

function connectUtilisateur(user:Utilisateur, serveur:Serveur)
{
	var index:number = serveur.utilisateurs.indexOf(user);
	if(index!==-1)
	{
		serveur.utilisateurs[index].status="Connecte";
	}
	return serveur;
}

function creerChannel(serveur:Serveur, user: Utilisateur, nom:String)
{
	if(user.points>=1)
	{
		const channel:Channel = {nom:nom, createur:user, participants:[user], messages: []};
		serveur.channels.push(channel);
	}
	return serveur; 
}

function ajouterUtilisateurChannel(serveur:Serveur, user:Utilisateur, newUser:Utilisateur, channel:Channel)
{
	var index:number = channel.participants.indexOf(user);
	var indexChannel:number = serveur.channels.indexOf(channel);
	if(index!==-1 && (channel.createur===user||user.points>=2))
	{
		serveur.channels[indexChannel].participants.push(newUser);
	}
	return serveur;
}

function lireMessagesChannel(serveur:Serveur, user:Utilisateur, channel:Channel)
{
	let messages:Message[]  = []; 
	if(channel.participants.indexOf(user)!==-1)
	{
		for(let id in channel.messages)
		{
			messages.push(serveur.messages[id]);
		}
	}
	return messages;
}

function envoyerQuestion(serveur:Serveur, user:Utilisateur, contenu:String, channels:Channel[])
{
	// creation question
	// TODO correction verification user dans les chaines dans lesquelles il veut poster 
	const question:Question = {id:serveur.messages.length,contenu:contenu, emetteur:user, destination:channels};
	serveur.messages.push(question);

	for(let channel in channels)
	{
		if(channel.participants.indexOf(user)!==-1)
		{
		if(serveur.utilisateurs[serveur.utilisateurs.indexOf(user)].points===0)
		{
			serveur.utilisateurs[serveur.utilisateurs.indexOf(user)].points++;
		}
		
		
			serveur.channels[serveur.channels.indexOf(channel)].messages.push(question.id);
		}
	}
	return serveur;
}

function repondreQuestion(serveur:Serveur, user:Utilisateur, contenu:String, question:number, channel:Channel)
{
	if((channel.participants.indexOf(user)!==-1 && user.points>=3)||user.points===5)
	{
		const reponse:Reponse = {id:serveur.messages.length,contenu:contenu, emetteur:user, idQuestion:question};
		serveur.messages.push(reponse);
		serveur.channels[serveur.channels.indexOf(channel)].messages.push(reponse.id);
	}
	return serveur;
}

function noterQuestion(serveur:Serveur, user:Utilisateur, contenu:number, source:number, channel:Channel)
{
	if(channel.participants.indexOf(user)!==-1 && user.points>=1)
	{
		const note:Note = {id:serveur.messages.length,contenu:contenu, emetteur:user, idSource:source};
		serveur.messages.push(note);
		serveur.channels[serveur.channels.indexOf(channel)].messages.push(note.id);
		calculerPointsUtilisateurs(serveur,user);
	}
	return serveur;
}

function noterReponse(serveur:Serveur, user:Utilisateur, contenu:number, source:number, channel:Channel)
{
	if(channel.participants.indexOf(user)!==-1 && user.points>=2)
	{
		const note:Note = {id:serveur.messages.length,contenu:contenu, emetteur:user, idSource:source};
		serveur.messages.push(note);
		serveur.channels[serveur.channels.indexOf(channel)].messages.push(note.id);
		calculerPointsUtilisateurs(serveur,user);
	}
	return serveur;
}

function suspendreUtilisateur(serveur:Serveur, user:Utilisateur, userSuspendre:Utilisateur)
{
	if(user.points===5)
	{
		serveur.utilisateurs[serveur.utilisateurs.indexOf(userSuspendre)].status="Suspendu";
	}
	return serveur;
}

function calculerPointsUtilisateurs(serveur:Serveur, user:Utilisateur)
{
	var index:number = serveur.utilisateurs.indexOf(user);
	if(serveur.utilisateurs[index].points<5)
	{
		serveur.utilisateurs[index].points++;
	}
	return serveur;
}