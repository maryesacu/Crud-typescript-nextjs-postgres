import { Container, Menu, Button } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <Menu inverted attached style={{ padding: "1.5rem" }}>
      <Container>
        <Menu.Item onClick={() => router.push("/")}>
          <Image
            width="30"
            height="30"
            src="https://i.imgur.com/rBDNLAa.png"
            alt="nextjs logo"
          />
        </Menu.Item>
        <Menu.Menu position="left">
          <Menu.Item>
          <h1>Platos típicos</h1>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button onClick={() => router.push("/tasks/new")} primary>
            Agregar
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
