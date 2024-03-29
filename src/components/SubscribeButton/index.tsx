import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { api } from "../../services/api";
import { getStripeJS } from "../../services/stripe-js";
import styles from "./styles.module.scss";

export const SubscribeButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = useCallback(async () => {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJS();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }, [session, router]);

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
