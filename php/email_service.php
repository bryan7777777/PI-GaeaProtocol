<?php
/**
 * EMAIL SERVICE - Sistema de Notificações e Emails
 * 
 * Suporta:
 * - Notificações de vitória/derrota
 * - Recuperação de senha
 * - Validação de email
 * - Notificações gerais do sistema
 */

/**
 * Configurações de Email
 */
define('EMAIL_FROM', 'noreply@gaeaprotocol.com');
define('EMAIL_FROM_NAME', 'Gaea Protocol');
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'localhost');
define('SMTP_PORT', getenv('SMTP_PORT') ?: 25);
define('SMTP_USER', getenv('SMTP_USER') ?: '');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');

/**
 * Enviar email de recuperação de senha
 * 
 * @param string $email Email do usuário
 * @param string $codigo Código de 6 dígitos
 * @param string $link Link de reset
 * @return bool Sucesso ou falha
 */
function send_recovery_email($email, $codigo, $link) {
    $assunto = "Recuperação de Senha - Gaea Protocol";
    
    $corpo = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; background-color: #0d1f18; color: #e0e0e0; }
            .container { max-width: 600px; margin: 0 auto; background: #1e3a28; padding: 30px; border-radius: 8px; border-left: 4px solid #4caf50; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #4caf50; margin: 0; }
            .code { background: #0d1f18; padding: 20px; border-radius: 4px; text-align: center; margin: 20px 0; }
            .code .digit { font-size: 32px; font-weight: bold; color: #4caf50; letter-spacing: 10px; }
            .button { display: inline-block; background: #4caf50; color: #1e3a28; padding: 12px 30px; border-radius: 4px; text-decoration: none; margin: 20px 0; font-weight: bold; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #808080; border-top: 1px solid #4caf50; padding-top: 20px; }
            .warning { color: #ff9800; font-size: 14px; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🌍 Gaea Protocol</h1>
                <p>Recuperação de Senha</p>
            </div>
            
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir sua senha. Use o código a seguir:</p>
            
            <div class='code'>
                <div class='digit'>$codigo</div>
            </div>
            
            <p>Este código é válido por <strong>20 minutos</strong>.</p>
            
            <p style='text-align: center;'>
                <a href='$link' class='button'>Redefinir Senha</a>
            </p>
            
            <div class='warning'>
                ⚠️ Se você não solicitou esta recuperação, ignore este email. Sua conta está segura.
            </div>
            
            <div class='footer'>
                <p>© 2024 Gaea Protocol. Todos os direitos reservados.</p>
                <p>Este é um email automático. Não responda diretamente.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    return send_email($email, $assunto, $corpo);
}

/**
 * Enviar notificação de vitória em partida
 * 
 * @param string $email Email do usuário
 * @param string $username Nome do usuário
 * @param array $partida Dados da partida
 * @return bool Sucesso ou falha
 */
function send_victory_notification($email, $username, $partida) {
    $assunto = "🎉 Vitória! - Gaea Protocol";
    
    $lixo = $partida['lixoColetado'] ?? 0;
    $waves = $partida['wavesCompletadas'] ?? 0;
    $tempo = $partida['tempoJogo'] ?? 0;
    $dificuldade = $partida['dificuldade'] ?? 'Normal';
    
    $minutos = intval($tempo / 60);
    $segundos = $tempo % 60;
    
    $corpo = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; background-color: #0d1f18; color: #e0e0e0; }
            .container { max-width: 600px; margin: 0 auto; background: #1e3a28; padding: 30px; border-radius: 8px; border-left: 4px solid #4caf50; }
            .header { text-align: center; margin-bottom: 30px; background: #0d1f18; padding: 20px; border-radius: 4px; }
            .header h1 { color: #4caf50; margin: 0; font-size: 28px; }
            .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .stat { background: #0d1f18; padding: 15px; border-radius: 4px; border-left: 3px solid #4caf50; }
            .stat-label { font-size: 12px; color: #808080; text-transform: uppercase; }
            .stat-value { font-size: 24px; font-weight: bold; color: #4caf50; }
            .button { display: inline-block; background: #4caf50; color: #1e3a28; padding: 12px 30px; border-radius: 4px; text-decoration: none; margin: 20px 0; font-weight: bold; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #808080; border-top: 1px solid #4caf50; padding-top: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🎉 Vitória!</h1>
                <p>Parabéns, $username!</p>
            </div>
            
            <p>Você conquistou uma grande vitória em Gaea Protocol!</p>
            
            <div class='stats'>
                <div class='stat'>
                    <div class='stat-label'>Lixo Coletado</div>
                    <div class='stat-value'>$lixo</div>
                </div>
                <div class='stat'>
                    <div class='stat-label'>Waves Completadas</div>
                    <div class='stat-value'>$waves</div>
                </div>
                <div class='stat'>
                    <div class='stat-label'>Tempo</div>
                    <div class='stat-value'>{$minutos}m {$segundos}s</div>
                </div>
                <div class='stat'>
                    <div class='stat-label'>Dificuldade</div>
                    <div class='stat-value'>$dificuldade</div>
                </div>
            </div>
            
            <p style='text-align: center;'>
                <a href='https://gaeaprotocol.com' class='button'>Ver Dashboard</a>
            </p>
            
            <div class='footer'>
                <p>© 2024 Gaea Protocol. Todos os direitos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    return send_email($email, $assunto, $corpo);
}

/**
 * Enviar notificação de derrota em partida
 * 
 * @param string $email Email do usuário
 * @param string $username Nome do usuário
 * @param array $partida Dados da partida
 * @return bool Sucesso ou falha
 */
function send_defeat_notification($email, $username, $partida) {
    $assunto = "Partida Finalizada - Gaea Protocol";
    
    $lixo = $partida['lixoColetado'] ?? 0;
    $waves = $partida['wavesCompletadas'] ?? 0;
    
    $corpo = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; background-color: #0d1f18; color: #e0e0e0; }
            .container { max-width: 600px; margin: 0 auto; background: #1e3a28; padding: 30px; border-radius: 8px; border-left: 4px solid #ff9800; }
            .header { text-align: center; margin-bottom: 30px; background: #0d1f18; padding: 20px; border-radius: 4px; }
            .header h1 { color: #ff9800; margin: 0; font-size: 28px; }
            .message { background: #0d1f18; padding: 20px; border-radius: 4px; margin: 20px 0; }
            .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .stat { background: #0d1f18; padding: 15px; border-radius: 4px; border-left: 3px solid #ff9800; }
            .stat-label { font-size: 12px; color: #808080; text-transform: uppercase; }
            .stat-value { font-size: 24px; font-weight: bold; color: #ff9800; }
            .button { display: inline-block; background: #ff9800; color: #1e3a28; padding: 12px 30px; border-radius: 4px; text-decoration: none; margin: 20px 0; font-weight: bold; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #808080; border-top: 1px solid #ff9800; padding-top: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>⚔️ Partida Finalizada</h1>
            </div>
            
            <p>Olá $username,</p>
            
            <div class='message'>
                <p>Sua partida foi finalizada. Confira seus resultados e tente novamente!</p>
            </div>
            
            <div class='stats'>
                <div class='stat'>
                    <div class='stat-label'>Lixo Coletado</div>
                    <div class='stat-value'>$lixo</div>
                </div>
                <div class='stat'>
                    <div class='stat-label'>Waves Completadas</div>
                    <div class='stat-value'>$waves</div>
                </div>
            </div>
            
            <p style='text-align: center;'>
                <a href='https://gaeaprotocol.com' class='button'>Voltar ao Dashboard</a>
            </p>
            
            <div class='footer'>
                <p>© 2024 Gaea Protocol. Todos os direitos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    return send_email($email, $assunto, $corpo);
}

/**
 * Enviar email de boas-vindas
 * 
 * @param string $email Email do usuário
 * @param string $username Nome do usuário
 * @return bool Sucesso ou falha
 */
function send_welcome_email($email, $username) {
    $assunto = "Bem-vindo à Gaea Protocol!";
    
    $corpo = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; background-color: #0d1f18; color: #e0e0e0; }
            .container { max-width: 600px; margin: 0 auto; background: #1e3a28; padding: 30px; border-radius: 8px; border-left: 4px solid #4caf50; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #4caf50; margin: 0; }
            .features { margin: 20px 0; }
            .feature { margin: 15px 0; padding-left: 20px; border-left: 3px solid #4caf50; }
            .feature strong { color: #4caf50; }
            .button { display: inline-block; background: #4caf50; color: #1e3a28; padding: 12px 30px; border-radius: 4px; text-decoration: none; margin: 20px 0; font-weight: bold; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #808080; border-top: 1px solid #4caf50; padding-top: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🌍 Bem-vindo à Gaea Protocol!</h1>
            </div>
            
            <p>Olá $username,</p>
            
            <p>Sua conta foi criada com sucesso! Você agora é parte de um universo onde suas decisões moldam o destino de um planeta devastado.</p>
            
            <div class='features'>
                <div class='feature'>
                    <strong>Jogue:</strong> Enfrente desafios roguelike estratégicos com décks únicos.
                </div>
                <div class='feature'>
                    <strong>Progresso:</strong> Desbloqueie conquistas, melhore seu ranking e acumule prêmios.
                </div>
                <div class='feature'>
                    <strong>Comunidade:</strong> Compete com amigos e descubra estratégias novas.
                </div>
            </div>
            
            <p style='text-align: center;'>
                <a href='https://gaeaprotocol.com' class='button'>Começar Agora</a>
            </p>
            
            <div class='footer'>
                <p>© 2024 Gaea Protocol. Todos os direitos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    return send_email($email, $assunto, $corpo);
}

/**
 * Função genérica de envio de email com suporte a SMTP
 * 
 * @param string $para Email do destinatário
 * @param string $assunto Assunto do email
 * @param string $corpo Corpo do email (HTML)
 * @return bool Sucesso ou falha
 */
function send_email($para, $assunto, $corpo) {
    // Headers para email HTML
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . EMAIL_FROM_NAME . " <" . EMAIL_FROM . ">\r\n";
    $headers .= "Reply-To: " . EMAIL_FROM . "\r\n";
    $headers .= "X-Mailer: Gaea Protocol\r\n";
    
    // Tentar enviar via SMTP se configurado
    if (SMTP_HOST !== 'localhost' && SMTP_USER) {
        return send_email_smtp($para, $assunto, $corpo);
    }
    
    // Fallback: usar mail() nativo do PHP
    $resultado = mail($para, $assunto, $corpo, $headers);
    
    // Log do envio
    $log_message = date('Y-m-d H:i:s') . " | TO: $para | SUBJECT: $assunto | STATUS: " . ($resultado ? 'OK' : 'FAIL') . "\n";
    error_log($log_message, 3, __DIR__ . '/email_log.txt');
    
    return $resultado;
}

/**
 * Envio de email via SMTP (para servidores SMTP reais)
 * 
 * @param string $para Email do destinatário
 * @param string $assunto Assunto do email
 * @param string $corpo Corpo do email (HTML)
 * @return bool Sucesso ou falha
 */
function send_email_smtp($para, $assunto, $corpo) {
    // Se tiver PHPMailer disponível (via Composer)
    if (file_exists(__DIR__ . '/../../vendor/autoload.php')) {
        require_once __DIR__ . '/../../vendor/autoload.php';
        
        try {
            $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = SMTP_HOST;
            $mail->Port = SMTP_PORT;
            $mail->SMTPAuth = !empty(SMTP_USER);
            
            if ($mail->SMTPAuth) {
                $mail->Username = SMTP_USER;
                $mail->Password = SMTP_PASS;
                $mail->SMTPSecure = 'tls';
            }
            
            $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
            $mail->addAddress($para);
            $mail->Subject = $assunto;
            $mail->msgHTML($corpo);
            $mail->CharSet = 'UTF-8';
            
            $resultado = $mail->send();
            
            $log_message = date('Y-m-d H:i:s') . " | TO: $para | SUBJECT: $assunto | METHOD: SMTP | STATUS: OK\n";
            error_log($log_message, 3, __DIR__ . '/email_log.txt');
            
            return $resultado;
        } catch (\Exception $e) {
            error_log('SMTP Error: ' . $e->getMessage(), 3, __DIR__ . '/email_log.txt');
            return false;
        }
    }
    
    // Fallback para SMTP simples (sem PHPMailer)
    return send_email_simple_smtp($para, $assunto, $corpo);
}

/**
 * Fallback: SMTP simples usando fsockopen
 */
function send_email_simple_smtp($para, $assunto, $corpo) {
    $socket = @fsockopen(SMTP_HOST, SMTP_PORT, $errno, $errstr, 10);
    
    if (!$socket) {
        error_log("SMTP Connection Error: $errstr ($errno)", 3, __DIR__ . '/email_log.txt');
        return false;
    }
    
    // Função auxiliar para transação SMTP
    function smtp_cmd($socket, $cmd) {
        fputs($socket, $cmd . "\r\n");
        $response = fgets($socket, 1024);
        return $response;
    }
    
    try {
        smtp_cmd($socket, "EHLO " . $_SERVER['SERVER_NAME']);
        
        if (!empty(SMTP_USER) && !empty(SMTP_PASS)) {
            smtp_cmd($socket, "AUTH LOGIN");
            smtp_cmd($socket, base64_encode(SMTP_USER));
            smtp_cmd($socket, base64_encode(SMTP_PASS));
        }
        
        smtp_cmd($socket, "MAIL FROM: <" . EMAIL_FROM . ">");
        smtp_cmd($socket, "RCPT TO: <$para>");
        smtp_cmd($socket, "DATA");
        
        $message = "To: $para\r\n";
        $message .= "From: " . EMAIL_FROM_NAME . " <" . EMAIL_FROM . ">\r\n";
        $message .= "Subject: $assunto\r\n";
        $message .= "MIME-Version: 1.0\r\n";
        $message .= "Content-Type: text/html; charset=UTF-8\r\n";
        $message .= "\r\n$corpo\r\n";
        
        fputs($socket, $message . "\r\n.\r\n");
        fgets($socket, 1024);
        
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
        error_log(date('Y-m-d H:i:s') . " | TO: $para | SUBJECT: $assunto | METHOD: SMTP-RAW | STATUS: OK\n", 3, __DIR__ . '/email_log.txt');
        return true;
    } catch (\Exception $e) {
        @fclose($socket);
        error_log('SMTP Error: ' . $e->getMessage(), 3, __DIR__ . '/email_log.txt');
        return false;
    }
}

/**
 * Backward compatibility - Funções antigo nomenclatura
 */
function send_recovery_email_api($email, $codigo, $link) {
    return send_recovery_email($email, $codigo, $link);
}

// Exportar funções para uso global
?>
