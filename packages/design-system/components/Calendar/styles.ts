import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  position: relative;
  height: 0;

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    box-sizing: border-box;
  }

  .react-calendar {
    z-index: 100;
    position: absolute;
    left: 0;
    top: ${({ theme }) => theme.spacing.s1};
    padding: ${({ theme }) => theme.spacing.s2};
    width: 350px;
    max-width: 100%;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadow.elevation4};
    border-radius: ${rem("8px")};
    overflow: hidden;
    border: none;
    font-family: ${({ theme }) => theme.typography.roboto};
    line-height: 1.2;

    abbr[title] {
      text-decoration: none;
    }

    button {
      margin: 0;
      border: 0;
      outline: none;

      &:enabled:hover {
        cursor: pointer;
      }
    }

    /* Double View Styles */
    &--doubleView {
      width: 700px;

      .react-calendar__viewContainer {
        display: flex;
        margin: -0.5em;

        > * {
          width: 50%;
          margin: 0.5em;
        }
      }
    }

    /* Navigation Styles */
    &__navigation {
      height: ${rem("40px")};
      display: flex;
      margin-bottom: ${({ theme }) => theme.spacing.s1};

      button {
        min-width: ${rem("40px")};
        height: ${rem("40px")};
        font-size: ${rem("14px")};
        background: none;

        &:enabled:hover,
        &:enabled:focus {
          background-color: ${({ theme }) => theme.colors.gray100};
        }

        &[disabled] {
          background-color: ${({ theme }) => theme.colors.white};
        }
      }

      &__label {
        align-items: center;
        justify-content: center;
        padding: ${({ theme }) => theme.spacing.s1};
        border-radius: ${rem("4px")};
      }

      &__arrow {
        border-radius: ${rem("4px")};
        display: flex;
        align-items: center;
        justify-content: center;

        &:disabled span {
          color: ${({ theme }) => theme.colors.gray400};
        }
      }
    }

    /* Body Styles */
    &__month-view__weekdays {
      text-align: center;
      font-weight: 500;
      font-size: ${rem("14px")};
      margin-bottom: ${({ theme }) => theme.spacing.s1};

      &__weekday {
        padding: ${({ theme }) => theme.spacing.s2}
          ${({ theme }) => theme.spacing.s1};
      }
    }

    /* Start TODO find out where these styles are in the calendar */
    &__month-view__weekNumbers {
      font-weight: 500;

      .react-calendar__tile {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75em;
        padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
      }
    }
    /* End TODO find out where these styles are in the calendar */

    &__month-view__days {
      &__day {
        color: ${({ theme }) => theme.colors.black};
        font-size: ${rem("14px")};

        &:disabled {
          color: ${({ theme }) => theme.colors.gray400};
        }

        &--weekend {
          color: ${({ theme }) => theme.colors.black};
        }

        &--neighboringMonth {
          color: ${({ theme }) => theme.colors.gray400};
        }
      }
    }

    &__tile {
      max-width: 100%;
      text-align: center;
      padding: ${({ theme }) => theme.spacing.s3}
        ${({ theme }) => theme.spacing.s2};
      background: none;
      border-radius: ${rem("4px")};

      &:disabled {
        background-color: ${({ theme }) => theme.colors.white};
      }

      &:enabled:hover,
      &:enabled:focus {
        background-color: ${({ theme }) => theme.colors.gray100};
      }

      &--now {
        background: ${({ theme }) => theme.colors.gray100};

        &:enabled:hover,
        &:enabled:focus {
          background: ${({ theme }) => theme.colors.gray200};
        }
      }

      &--hasActive {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};

        &:enabled:hover,
        &:enabled:focus {
          background: ${({ theme }) => theme.colors.primary};
        }
      }

      &--active {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};

        &:enabled:hover,
        &:enabled:focus {
          background: ${({ theme }) => theme.colors.primary};
        }
      }
    }

    &--selectRange {
      .react-calendar__tile--hover {
        background-color: ${({ theme }) => theme.colors.gray100};
      }
    }

    &__year-view,
    &__decade-view,
    &__century-view {
      .react-calendar__tile {
        padding: ${({ theme }) => theme.spacing.s5}
          ${({ theme }) => theme.spacing.s2};
      }
    }
  }
`;
