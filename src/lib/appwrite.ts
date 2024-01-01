import { Client, Databases, Storage, Account, Teams } from "appwrite";
import { ENDPOINT, PROJECT_ID } from "./utils";

// * Create a new Appwrite client instance
const client = new Client();

// * Create a new Appwrite database instance
const databases = new Databases(client);

// * Create a new Appwrite storage instance
const storage = new Storage(client);

// * Create a new Appwrite account instance
const account = new Account(client);

// * Create a new Appwrite teams instance
const teams = new Teams(client);

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export { client, databases, storage, account, teams };
