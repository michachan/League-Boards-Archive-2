import {
  Flex,
  Text,
} from '@chakra-ui/react';
import type { ReactElement } from 'react';

export default function Contact(): ReactElement {
  return (
    <Flex><Text>
      A StruxLab Product - Page coming soon.
    </Text></Flex>
  );
}

type GetStaticProps = {
  props: {
    pageTitle: string,
  }
};
export async function getStaticProps(): Promise<GetStaticProps> {
  return {
    props: {
      pageTitle: 'Contact Us',
    }
  };
}