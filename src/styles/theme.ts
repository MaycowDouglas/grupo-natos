export const theme = {
  button: {
    box: 'inline-flex justify-center items-center gap-2 px-10 py-2',
    defaults: 'rounded-full border-2 font-medium transition-all',
    text: {
      fill: 'text-white',
      outline: {
        red: 'text-red-700',
        blue: 'text-blue-700',
        green: 'text-green-600',
        yellow: 'text-yellow-500',
        white: 'text-white',
        black: 'text-black',
      },
    },
    border: {
      red: 'border-red-700',
      blue: 'border-blue-700',
      green: 'border-green-600',
      yellow: 'border-yellow-500',
      white: 'border-white',
      black: 'border-black',
    },
    background: {
      fill: {
        red: 'bg-red-700',
        blue: 'bg-blue-700',
        green: 'bg-green-600',
        yellow: 'bg-yellow-500',
        white: 'bg-white',
        black: 'bg-black',
      },
      outline: 'bg-transparent',
    },
  },
  heading: {
    defaults: 'font-medium',
    size: {
      20: 'text-xl',
      24: 'text-2xl',
      30: 'text-3xl',
      36: 'text-4xl',
      48: 'text-5xl',
    },
  },
  link: 'inline-flex justify-center items-center gap-2 text-blue-700 hover:text-blue-800',
  text: {
    muted: 'text-gray-500',
    size: {
      12: 'text-xs',
      14: 'text-sm',
      16: '',
      18: 'text-lg',
      20: 'text-xl',
    },
  },
}
