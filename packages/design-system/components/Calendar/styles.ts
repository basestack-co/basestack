import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    box-sizing: border-box;
  }

  .react-calendar {
    padding: ${({ theme }) => theme.spacing.s2};
    width: 350px;
    max-width: 100%;
    background: ${({ theme }) => theme.calendar.backgroundColor};
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
          background-color: ${({ theme }) =>
            theme.calendar.navigation.button.hover.backgroundColor};
        }

        &[disabled] {
          background-color: ${({ theme }) =>
            theme.calendar.navigation.button.disabled.backgroundColor};
        }
      }

      &__label {
        color: ${({ theme }) => theme.calendar.day.color};
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
          color: ${({ theme }) =>
            theme.calendar.navigation.button.disabled.color};
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
        color: ${({ theme }) => theme.calendar.day.color};
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
        color: ${({ theme }) => theme.calendar.day.color};
        font-size: ${rem("14px")};

        &:disabled {
          color: ${({ theme }) => theme.calendar.day.disabled.color};
        }

        &--weekend {
          color: ${({ theme }) => theme.calendar.day.weekend.color};
        }

        &--neighboringMonth {
          color: ${({ theme }) => theme.calendar.day.neighboringMonth.color};
        }
      }
    }

    &__tile {
      color: ${({ theme }) => theme.calendar.title.color};
      max-width: 100%;
      text-align: center;
      padding: ${({ theme }) => theme.spacing.s3}
        ${({ theme }) => theme.spacing.s2};
      background: none;
      border-radius: ${rem("4px")};

      &:disabled {
        color: ${({ theme }) => theme.calendar.title.disabled.color};
        background-color: ${({ theme }) =>
          theme.calendar.title.disabled.backgroundColor};
      }

      &:enabled:hover,
      &:enabled:focus {
        background-color: ${({ theme }) =>
          theme.calendar.title.hover.backgroundColor};
      }

      &--now {
        background: ${({ theme }) => theme.calendar.now.backgroundColor};

        &:enabled:hover,
        &:enabled:focus {
          background: ${({ theme }) =>
            theme.calendar.now.hover.backgroundColor};
        }
      }

      &--hasActive {
        background: ${({ theme }) => theme.calendar.hasActive.backgroundColor};
        color: ${({ theme }) => theme.calendar.hasActive.color};

        &:enabled:hover,
        &:enabled:focus {
          background: ${({ theme }) =>
            theme.calendar.hasActive.hover.backgroundColor};
        }
      }

      &--active {
        background: ${({ theme }) => theme.calendar.active.backgroundColor};
        color: ${({ theme }) => theme.calendar.active.color};

        &:enabled:hover,
        &:enabled:focus {
          background: ${({ theme }) =>
            theme.calendar.active.hover.backgroundColor};
        }
      }
    }

    &--selectRange {
      .react-calendar__tile--hover {
        background-color: ${({ theme }) =>
          theme.calendar.selectRange.backgroundColor};
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
