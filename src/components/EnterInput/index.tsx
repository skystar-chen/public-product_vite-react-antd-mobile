import {
  memo,
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import './index.scss';

const PAGE_BASE_CLASS: string = 'pda-enter-input';

export interface EnterInputRefProps {
  onClear: () => void,
}
interface EnterInputProps {
  className?: string,
  style?: React.CSSProperties,
  placeholder?: string,
  autoFocus?: boolean,
  readOnly?: boolean,
  // 聚焦禁止呼出键盘
  isDisableKeyboard?: boolean,
  // 聚焦是否全选中内容
  isFocusSelectAll?: boolean,
  format?: (value: string) => string,
  onEnter?: (value: string) => void,
  onChange?: (value: string) => void,
}

const EnterInput = forwardRef<EnterInputRefProps, EnterInputProps>((props, ref) => {

  const {
    className,
    style,
    placeholder,
    autoFocus = false,
    readOnly = false,
    isDisableKeyboard = false,
    isFocusSelectAll = false,
    format,
    onEnter,
    onChange,
  } = props;

  const [inputValue, setInputValue] = useState<string>('');
  const inputValueRef = useRef<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      onClear: () => {
        setInputValue('');
        inputValueRef.current = '';
        inputRef.current?.focus();
      },
    }),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value);
    setInputValue(value);
  }

  const handleClick = (/* e: React.MouseEvent<HTMLInputElement, MouseEvent> */) => {
    // 禁止首次呼出键盘
    if (isDisableKeyboard) {
      inputRef.current?.setAttribute('readonly', 'readonly');
      const timer = setTimeout(() => {
        inputRef.current?.removeAttribute('readonly');
        clearTimeout(timer);
      }, 200);
    }
  }

  const keypressFun = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const value = inputRef.current?.value || '';
      // 去除上一次扫描的内容
      const noRepeatValue = inputValueRef.current === value.substring(0, inputValueRef.current.length)
        ? value.substring(inputValueRef.current.length)
        : value;
      const newValue = typeof format === 'function' ? format(noRepeatValue) : noRepeatValue;
      setInputValue(newValue);
      inputValueRef.current = newValue;
      onEnter?.(newValue);
    }
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    // 聚焦时全选
    isFocusSelectAll && e.target.select();
    // 聚焦禁止呼出键盘
    if (isDisableKeyboard) {
      e.target.setAttribute('readonly', 'readonly');
      const timer = setTimeout(() => {
        e.target.removeAttribute('readonly');
        clearTimeout(timer);
      }, 200);
    }
  }

  useEffect(() => {
    inputRef.current?.addEventListener('keypress', keypressFun);
    autoFocus && inputRef.current?.focus();

    return () => {
      inputRef.current?.removeEventListener('keypress', keypressFun);
    };
  }, []);

  return (
    <input
      type='text'
      ref={inputRef}
      value={inputValue}
      onChange={handleChange}
      onClick={handleClick}
      className={`${PAGE_BASE_CLASS} ${className} ${readOnly && PAGE_BASE_CLASS + '-readonly'}`}
      style={style}
      placeholder={placeholder}
      // autoFocus={autoFocus}
      readOnly={readOnly}
      // inputMode={isDisableKeyboard? 'none' : 'text'}
      onFocus={handleFocus}
    />
  );
});

export default memo(EnterInput);
