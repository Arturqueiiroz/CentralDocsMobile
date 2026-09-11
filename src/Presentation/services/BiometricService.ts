
// src/services/BiometricService.ts

import * as LocalAuthentication from "expo-local-authentication";

export const BiometricService = {
  
  isBiometricAvaliable: async (): Promise<boolean> => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  },
 
  autenticarComBiometria: async (
    mensagem: string = 'Autentique-se para continuar'
  ): Promise<boolean> => {
    try {
      const disponivel = await BiometricService.isBiometricAvaliable();

      if (!disponivel) {
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: mensagem,
        fallbackLabel: 'Usar senha padrão',
        cancelLabel: 'Cancelar',
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error('Erro na autenticação biométrica:', error);
      return false;
    }
  },
};

