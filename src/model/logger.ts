import { Webhook } from 'discord-webhook-node';
const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL || '');

const Logger = {
  log: (message: string) => {
    console.log(message);
    try {
      hook.info('Information', 'Logged', message);
    } catch (error) {
      console.error('Could not send Webhook!');
      console.error(error);
    }
  },
  error: (error: any) => {
    console.error(error);
    try {
      hook.error('ERROR', 'Logged', String(error));
    } catch (error) {
      console.error('Could not send Webhook!');
      console.error(error);
    }
  },
};

console.error;
export default Logger;
