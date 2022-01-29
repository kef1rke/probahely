<script>
	import '@kahi-ui/framework/dist/kahi-ui.framework.min.css';

	import { Button, Card, Code, Overlay, Text } from '@kahi-ui/framework';
</script>

<Button for="overlay-preview" palette="accent">Open MODAL</Button>

<Overlay.Container logic_id="overlay-preview" dismissible>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" max_width="75">
			<Card.Header>Are you sure?</Card.Header>

			<Card.Section>
				<Text>
					Are you sure you want to delete:
					<Code>important-file.docx</Code>?
				</Text>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>

				<Button palette="negative">Delete</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
