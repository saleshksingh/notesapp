import { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */
Amplify.configure(outputs);

const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [notes, setNotes] = useState([]);
  const { signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const { data: notesData } = await client.models.Note.list();
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  return (
	  
    <Flex
      className="App"
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="70%"
      margin="0 auto"
    >
      <Heading level={1}>My Notes</Heading>
      <Divider />
	  	  <script data-target-id="bp-e729cea0-2657-4ce3-8f68-ec2c8e97ea1c" async type="module" src="https://cdn.elements.amazon/elements/amazon-delivery-card/v1.0/web-component.js">
      <Grid
        margin="3rem 0"
        autoFlow="column"
        justifyContent="center"
        gap="2rem"
        alignContent="center"
      >
        {notes.map((note) => (
          <Flex
            key={note.id}
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
            border="1px solid #ccc"
            padding="2rem"
            borderRadius="5%"
            className="box"
          >
            <View>
              <Heading level={3}>{note.name || note.description || "Untitled Note"}</Heading>
            </View>
          </Flex>
        ))}
      </Grid>
		<amazon-delivery-card product-external-id="MM-0H7V-BMAC" show-explainer="true" color-mode="dark">
		</amazon-delivery-card>
      <Button onClick={signOut}>Sign Out</Button>
    </Flex>
  );
}