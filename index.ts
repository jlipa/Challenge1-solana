// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

let userPublicKey = 'dummy'

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        console.log("Connection object is:", connection);

        // Make a wallet (keypair) from privateKey and get its balance
        // const myWallet = await Keypair.from (privateKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(userPublicKey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        // const myWallet = await Keypair.fromSecretKey(privateKey);

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(userPublicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const getPublicKey = async () => {
    var args = process.argv.slice(2);

    if ( args.length > 0 ) {
        // Consider / Assume the first argument as the public key address
        userPublicKey = args[0]
    } else {
        // Generate key pair using previous code to use in the wallet
        userPublicKey = await generateKeyPair()
    }

    console.log(`Processing wallet: ${userPublicKey}`)
}

const generateKeyPair = async () => {
    // Create a new keypair
    let newPair = new Keypair();

    // Exact the public and private key from the keypair
    let publicKey = new PublicKey(newPair._keypair.publicKey).toString();
    let privateKey = newPair._keypair.secretKey;

    console.log("Public Key of the generated keypair", publicKey);
    return publicKey
}

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getPublicKey()
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();
