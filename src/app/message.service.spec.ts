import { MessageService } from "./message.service";


describe('Message Service', () => {
  let msgServ: MessageService;

  beforeEach(() => {
    msgServ = new MessageService();
  });

  it('Should have no messages to start', () => {
    expect(msgServ.messages.length).toBe(0);
  });

  it('Should add a message when add is called', () => {
    msgServ.add('message 1');
    expect(msgServ.messages.length).toBe(1);
  });

  it('Should clear all messages when clear is called', () => {
    msgServ.add('message 1');
    msgServ.clear();
    expect(msgServ.messages.length).toBe(0);
  });
});
