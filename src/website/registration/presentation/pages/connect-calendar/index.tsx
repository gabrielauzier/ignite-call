import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../register/styles'
import { ConnectBox, ConnectItem } from './styles'
import { AbstractSignInUsecase } from '@/website/auth/domain/usecases'
import { signIn } from 'next-auth/react'

interface ConnectCalendarProps {
  authenticate: AbstractSignInUsecase
}

export default function ConnectCalendar({
  authenticate,
}: ConnectCalendarProps) {
  async function handleConnect() {
    await authenticate.execute()
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm" onClick={handleConnect}>
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
