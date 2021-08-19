import * as React from 'react';

export type MessageProps = {
  text: string;
};

export const Message: React.FC<MessageProps> = ({ text }) => (
  <p>🙀 {text} 🙀</p>
);
