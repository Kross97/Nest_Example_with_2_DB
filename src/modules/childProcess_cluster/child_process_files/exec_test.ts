(() => {
  process.stdout.write(`
     Тестирование запуска команды child_process.exec(command[, options][, callback]) прошло успешно! \n
     Данные о внутреннем процессе: PID ${process.pid} \n
      Есть ли канал для обмена сообщениями ${process.channel}:${process.channel ? "Есть" : "Нет"} \n
     Есть ли канал stdout ${process.stdout}:${process.stdout ? "Есть" : "Нет"} \n
     CWD ${process.cwd()} \n
     ARGV внутреннего process ${process.argv} \n
     ARGV0 внутреннего process ${process.argv0} \n
    `);
  process.exit(0);
})();
