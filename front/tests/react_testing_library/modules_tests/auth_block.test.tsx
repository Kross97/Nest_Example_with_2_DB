//@ts-nocheck
import React from 'react';
import { AuthBlock } from '../../../src/modules/auth';
import { render, screen } from '@testing-library/react';

/**
 * Нужен для включения доп методотов у результата вызова expect() (toBeInTheDocument например)
 * */
import '@testing-library/jest-dom';


test('Тестирование Auth модуля чер React_test_library', () => {
  render(<AuthBlock/>);

  expect(screen.getByTestId('auth_header')).toBeInTheDocument();
});