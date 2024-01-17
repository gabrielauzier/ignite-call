import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import { Container, Form, FormError, Header } from './styles'
import {
  RegisterFormData,
  registerFormSchema,
} from '@/website/registration/validation/schemas'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AbstractRegisterUserUsecase } from '@/website/registration/domain'
import { logger } from '@/common/util'
import { AxiosError } from 'axios'
import { SystemError } from '@/common/domain/errors'

interface RegisterProps {
  register: AbstractRegisterUserUsecase
}

export default function Register({ register: registerUsecase }: RegisterProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const query = useSearchParams()

  useEffect(() => {
    const username = query.get('username')
    if (username) {
      setValue('username', username)
    }
  }, [query, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await registerUsecase.execute({
        name: data.name,
        username: data.username,
      })
    } catch (err) {
      if (err instanceof SystemError) {
        alert('Nome de usuário já existente. ')
      }
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuário"
            {...register('username')}
            crossOrigin={undefined}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput
            placeholder="Seu nome"
            {...register('name')}
            crossOrigin={undefined}
          />

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
