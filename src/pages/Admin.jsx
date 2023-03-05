import { useState } from "react";
import { addNew, login, updateAll } from "../api";

export default function Admin() {
  const auth = localStorage.getItem("_auth");
  const [updating, setUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signOut = () => {
    localStorage.removeItem("_auth");
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    addNew({
      domain: e.target[0].value,
      name: e.target[1].value,
    }).finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleUpdate = () => {
    setUpdating(true);
    updateAll().finally(() => setUpdating(false));
  };

  if (!auth)
    return (
      <div>
        Unauthenticated!
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login({
              username: e.target[0].value,
              password: e.target[1].value,
            })
              .then((res) => {
                localStorage.setItem("_auth", res.data.token);
                window.location.reload();
              })
              .catch((err) => console.log(err));
          }}
        >
          <input name="username" type="text" placeholder="username" />
          <input name="password" type="password" placeholder="password" />
          <button type="submit">Sign in</button>
        </form>
      </div>
    );

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "500px",
        marginTop: "100px",
      }}
    >
      <button onClick={() => signOut()}>Sign out</button>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <input name="domain" type="text" placeholder="domain" />
        <input name="name" type="text" placeholder="name" />
        <button type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      <button
        style={{ marginTop: "10px" }}
        disabled={updating}
        onClick={handleUpdate}
      >
        {updating ? "Updating..." : "Update all"}
      </button>
    </div>
  );
}
