import { Box, Text } from "@chakra-ui/react";
import { TerminalWindow } from "@/components/CaseStudy/TerminalWindow";
import { renderAiText } from "./AiMark";

export const Retrospective = ({ body }: { body: string }) => (
  <TerminalWindow
    filename="retrospective.md"
    label="what I'd change next time"
    command="cat retrospective.md"
    mb={10}
    id="what-id-change"
  >
    <Text fontSize="14px" lineHeight={1.7} color="brand.textSecondary">
      {renderAiText(body)}
      <Box as="span" className="cursor-caret" aria-hidden="true" />
    </Text>
  </TerminalWindow>
);
