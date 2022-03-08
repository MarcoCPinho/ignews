import { useSession, signIn } from "next-auth/react";
import { useCallback } from "react";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session } = useSession();

  const handleSubscribe = useCallback(() => {
    if (!session) {
      signIn("github");
      return;
    }

    // criação da "checkout session"
  }, [session]);

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
};
