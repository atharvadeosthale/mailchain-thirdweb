import { ConnectWallet, useAddress, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

const dropAddress = "0xfFF119E54849449195C5b85A38D7D7EE8e527eb2";

export default function Home() {
  const address = useAddress();

  const triggerMail = async () => {
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        body: JSON.stringify({ address }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return alert(
          "Unable to send mail! However, the drop has been claimed!"
        );
      }
      alert(
        "Drop claimed successfully! Check your mailchain for further instructions!"
      );
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while sending the mail, however the drop has been claimed successfully"
      );
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Claim our drop!</h1>

        <p className={styles.description}>
          Claim the drop using the button below and we will send further
          instructions through Mailchain!
        </p>

        <div className={styles.connect}>
          <Web3Button
            contractAddress={dropAddress}
            action={async (contract) => {
              await contract.erc721.claim(1);
              await triggerMail();
            }}
          >
            Claim Drop!
          </Web3Button>
        </div>

        {/* <div className={styles.grid}>
          <a href="https://portal.thirdweb.com/" className={styles.card}>
            <h2>Portal &rarr;</h2>
            <p>
              Guides, references and resources that will help you build with
              thirdweb.
            </p>
          </a>

          <a href="https://thirdweb.com/dashboard" className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>
              Deploy, configure and manage your smart contracts from the
              dashboard.
            </p>
          </a>

          <a
            href="https://portal.thirdweb.com/templates"
            className={styles.card}
          >
            <h2>Templates &rarr;</h2>
            <p>
              Discover and clone template projects showcasing thirdweb features.
            </p>
          </a>
        </div> */}
      </main>
    </div>
  );
}
